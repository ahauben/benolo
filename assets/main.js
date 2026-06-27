/* BENOLO — interactions: mobile nav + membership form */

document.addEventListener("DOMContentLoaded", () => {
  /* mobile nav */
  const burger = document.querySelector(".burger");
  const links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* membership form — static site: build a mailto */
  const form = document.querySelector("#join-form");
  if (form) {
    // live preview of the company logo
    const logoInput = form.querySelector("#logo");
    const preview = document.querySelector("#logo-preview");
    if (logoInput && preview) {
      const pImg = preview.querySelector("img");
      const pName = preview.querySelector(".fname");
      logoInput.addEventListener("change", () => {
        const file = logoInput.files && logoInput.files[0];
        if (!file) { preview.hidden = true; return; }
        pName.textContent = file.name;
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (ev) => { pImg.src = ev.target.result; pImg.style.display = "block"; };
          reader.readAsDataURL(file);
        } else {
          pImg.removeAttribute("src"); pImg.style.display = "none";
        }
        preview.hidden = false;
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const get = (k) => (data.get(k) || "").toString().trim();
      const logoFile = logoInput && logoInput.files && logoInput.files[0] ? logoInput.files[0].name : "";

      const lines = [
        `Société / Company: ${get("company")}`,
        `Contact: ${get("contact")}`,
        `E-mail: ${get("email")}`,
        `Téléphone / Phone: ${get("phone")}`,
        `Type: ${get("type")}`,
        `Marques / Brands: ${get("brands")}`,
        `Logo: ${logoFile ? logoFile + " (à joindre / to attach)" : "—"}`,
        ``,
        `Message:`,
        get("message"),
      ];
      const subject = encodeURIComponent(`Adhésion BENOLO — ${get("company") || get("contact")}`);
      const body = encodeURIComponent(lines.join("\n"));

      const success = document.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
        const attach = success.querySelector(".logo-attach");
        if (attach) attach.hidden = !logoFile;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      window.location.href = `mailto:contact@benolo.be?subject=${subject}&body=${body}`;
    });
  }

  /* mark active nav link by filename */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* dropdown menus */
  const triggers = document.querySelectorAll(".nav-trigger");
  triggers.forEach((btn) => {
    const dd = btn.parentElement.querySelector(".dropdown");
    // mark parent active if a child is the current page
    if (dd && dd.querySelector('[aria-current="page"]')) btn.classList.add("active");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      document.querySelectorAll(".dropdown").forEach((o) => {
        if (o !== dd) {
          o.classList.remove("open");
          const b = o.parentElement.querySelector(".nav-trigger");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      document.querySelectorAll(".dropdown.open").forEach((o) => o.classList.remove("open"));
      document.querySelectorAll('.nav-trigger[aria-expanded="true"]').forEach((b) =>
        b.setAttribute("aria-expanded", "false")
      );
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".dropdown.open").forEach((o) => o.classList.remove("open"));
      document.querySelectorAll('.nav-trigger[aria-expanded="true"]').forEach((b) =>
        b.setAttribute("aria-expanded", "false")
      );
    }
  });
});
