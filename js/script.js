document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");
  const navbar = document.querySelector(".navbar");

  // Smooth scroll when clicking navbar links
  navLinks.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, null, targetId);
      }

      // Reset ALL links first
      navLinks.forEach(link => {
        link.classList.remove("active");
        link.style.color = "white"; // reset color to white
      });

      // Activate clicked link
      this.classList.add("active");
      const color = this.dataset.color || "#96cae6";
      const bgColor = this.dataset.bg || "#3e82a6";
      this.style.color = color;
      navbar.style.backgroundColor = bgColor;
    });
  });

  // Scroll detection
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      // Reset all links each time
      navLinks.forEach(link => {
        link.classList.remove("active");
        link.style.color = "white";
      });

      const activeLink = document.querySelector(`.navbar a[href="#${current}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
        const color = activeLink.dataset.color || "#96cae6";
        const bgColor = activeLink.dataset.bg || "#3e82a6";
        activeLink.style.color = color;
        navbar.style.backgroundColor = bgColor;
      }
    }, 75);
  });
});
