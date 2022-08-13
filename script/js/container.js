const container = document.querySelector("#container");

let halfWidth = container.clientWidth / 2;
let halfHeight = container.clientHeight / 2;

let x = window.innerWidth / 2 - halfWidth;
let y = window.innerHeight / 2 - halfHeight;

container.style.left = x + "px";
container.style.top = y + "px";

window.addEventListener("resize", () => {
  halfWidth = container.clientWidth / 2;
  halfHeight = container.clientHeight / 2;

  x = window.innerWidth / 2 - halfWidth;
  y = window.innerHeight / 2 - halfHeight;

  container.style.left = x + "px";
  container.style.top = y + "px";
});
