// dropdown.js
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownContent = document.querySelector(".dropdown-content");

  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("change");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });

  // Stäng dropdown-menyn om användaren klickar utanför den
  window.addEventListener("click", function (event) {
    if (
      !event.target.closest(".menu-btn") &&
      dropdownContent.style.display === "block"
    ) {
      dropdownContent.style.display = "none";
      menuBtn.classList.remove("change");
    }
  });
});
