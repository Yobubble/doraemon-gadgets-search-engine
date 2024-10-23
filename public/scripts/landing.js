document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".search-bar");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Form submission prevented");
  });
});
