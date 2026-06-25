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
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const get = (k) => (data.get(k) || "").toString().trim();

      const lines = [
        `Société / Company: ${get("company")}`,
        `Contact: ${get("contact")}`,
        `E-mail: ${get("email")}`,
        `Téléphone / Phone: ${get("phone")}`,
        `Type: ${get("type")}`,
        `Marques / Brands: ${get("brands")}`,
        ``,
        `Message:`,
        get("message"),
      ];
      const subject = encodeURIComponent(`Adhésion BENOLO — ${get("company") || get("contact")}`);
      const body = encodeURIComponent(lines.join("\n"));

      const success = document.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
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
});
