# BENOLO.be

Site web de **BENOLO** — la fédération belge des producteurs de boissons sans alcool et à faible teneur en alcool (no & low).

Site statique, trilingue (FR / NL / EN), sans dépendances ni build. Prêt pour GitHub Pages avec le domaine `benolo.be`.

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil — présentation, mission, mouvement en chiffres |
| `pourquoi.html` | Pourquoi le NOLO — alcool & finances publiques, santé, économie |
| `cadre-legal.html` | Cadre légal de la fédération (forme ASBL, objet, gouvernance) |
| `federations.html` | Fédérations actives à l'étranger (UK / US / EU), mindful & flexidrinking |
| `actualites.html` | Actualités des membres — vitrine des marques (visuels SVG à remplacer par des photos) |
| `presse.html` | Espace presse — communiqué de création du 25 juin 2026 + ressources |
| `inscription.html` | Formulaire d'adhésion (gratuit en phase de lancement) |

## Multilingue

Le contenu vit dans `assets/i18n.js` (dictionnaire `FR / NL / EN`). Chaque élément traduisible porte un attribut `data-i18n="clé"`. Le sélecteur de langue (en-tête) applique la langue et la mémorise dans le navigateur. Langue par défaut : FR.

Pour modifier un texte : éditez la clé correspondante dans les trois langues dans `assets/i18n.js`.

## Formulaire d'adhésion

Le site étant statique, le formulaire (`inscription.html`) compose un e-mail pré-rempli vers `contact@benolo.be` (`mailto:`). Pour collecter les inscriptions automatiquement, branchez un service de formulaire (Formspree, Netlify Forms, Tally…) en remplaçant le gestionnaire `#join-form` dans `assets/main.js`.

## Déploiement sur GitHub Pages

1. Créez un dépôt (ex. `benolo-site`) et poussez ces fichiers à la racine :
   ```bash
   git init
   git add .
   git commit -m "BENOLO — site initial"
   git branch -M main
   git remote add origin git@github.com:VOTRE-COMPTE/benolo-site.git
   git push -u origin main
   ```
2. Dans le dépôt : **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le fichier `CNAME` (déjà présent) configure le domaine `benolo.be`. Côté registrar du domaine, pointez le DNS vers GitHub Pages :
   - 4 enregistrements **A** vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (et un `CNAME` `www` → `VOTRE-COMPTE.github.io` si vous voulez `www.benolo.be`)
4. Cochez **Enforce HTTPS** une fois le certificat émis.

Le fichier `.nojekyll` garantit que GitHub sert le dossier `assets/` tel quel.

## Structure

```
benolo-site/
├── index.html
├── pourquoi.html
├── cadre-legal.html
├── federations.html
├── inscription.html
├── assets/
│   ├── styles.css      ← design system
│   ├── i18n.js         ← moteur + dictionnaire FR/NL/EN
│   ├── main.js         ← nav mobile + formulaire
│   ├── logo-mark.png   ← monogramme (en-tête, fond transparent)
│   ├── logo-full.png   ← logo complet (téléchargement presse)
│   ├── logo-foot.png   ← logo blanc + or (pied de page sombre)
│   └── favicon.png     ← favicon (monogramme)
├── CNAME               ← benolo.be
├── .nojekyll
└── README.md
```

## Sources des chiffres cités

Les données de la page « Pourquoi le NOLO » renvoient à des sources publiques : coût social des substances en Belgique (Lievens et al., 2017 ; *International Journal of Drug Policy*), coûts de santé attribuables à l'alcool (*BMC Public Health*, 2017), et tendances de marché no/low (IWSR, Innova Market Insights). Vérifiez et actualisez ces références avant toute communication officielle.

---

© 2026 BENOLO — ASBL en cours de constitution, Bruxelles.
