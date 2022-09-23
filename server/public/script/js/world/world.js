import gsap from "/node_modules/gsap/all.js";

const svg = document.querySelector("svg");
const asia = document.querySelectorAll(".asia");
const europe = document.querySelectorAll(".europe");
const oceania = document.querySelectorAll(".oceania");
const africa = document.querySelectorAll(".africa");
const northAmerica = document.querySelectorAll(".northAmerica");
const southAmerica = document.querySelectorAll(".southAmerica");

const info_background = document.querySelector("div");
const info_text = info_background.querySelector("p");

function info_disappear() {
  info_background.style.animation = "background_disappear 0.5s linear forwards";
  info_text.style.animation = "font_disappear 0.5s linear forwards";
}

function info_appear() {
  info_background.style.top = window.innerHeight / 2 - 45 + "px";
  info_background.style.animation = "background_show 0.5s linear forwards";
  info_text.style.animation = "font_show 0.5s linear forwards";
}

const island = [asia, europe, oceania, africa, northAmerica, southAmerica];

// 3초 동안 이벤트 발생을 막기 위한 함수
setTimeout(() => {
  island.forEach((country) => {
    for (let i = 0; i < country.length; i++) {
      country[i].addEventListener("mouseout", () => {
        for (let j = 0; j < country.length; j++) {
          country[j].classList.add("st0");
          info_disappear();
        }
      });

      country[i].addEventListener("mouseover", () => {
        for (let j = 0; j < country.length; j++) {
          country[j].classList.remove("st0");
          info_appear();

          const classExist = country[j].className.baseVal;

          switch (classExist) {
            case "asia":
              info_text.innerText = "ASIA";
              break;
            case "europe":
              info_text.innerText = "EUROPE";
              break;
            case "oceania":
              info_text.innerText = "OCEANIA";
              break;
            case "africa":
              info_text.innerText = "AFRICA";
              break;
            case "northAmerica":
              info_text.innerText = "NORTH AMERICA";
              break;
            case "southAmerica":
              info_text.innerText = "SOUTH AMERICA";
              break;
          }
        }
      });

      country[i].addEventListener("click", () => {
        for (let j = 0; j < country.length; j++) {
          country[j].classList.remove("st0");

          const classExist = country[j].className.baseVal;

          switch (classExist) {
            case "asia":
              location.href = "/world/asia";
              break;
            case "europe":
              location.href = "/world/europe";
              break;
            case "oceania":
              location.href = "/world/oceania";
              break;
            case "africa":
              location.href = "/world/africa";
              break;
            case "northAmerica":
              location.href = "/world/north-america";
              break;
            case "southAmerica":
              location.href = "/world/south-america";
              break;
          }
        }
      });
    }
  });
}, 3000);

// 3초 후 id 삭제를 통해 id 에 고정된 style 값을 삭제
const path = document.querySelectorAll("path");

for (let i = 0; i < path.length; i++) {
  setTimeout(() => {
    path[i].removeAttribute("id");
  }, 3000);
}
