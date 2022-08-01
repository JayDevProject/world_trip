const asia_svg = document.getElementById("svg");
const countries_text = asia_svg.querySelectorAll("text");

countries_text.forEach((country) => {
  setTimeout(() => {
    country.style.visibility = "visible";
  }, 3500);
});
