const imgPost = document.querySelector(".imgPost");
const videoPost = document.querySelector(".videoPost");
const user = document.querySelector(".user").value;

const path = window.location.pathname;

switch (path) {
  case `/trip/${user}`:
    imgPost.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    break;
  case `/trip/${user}/v`:
    videoPost.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}
