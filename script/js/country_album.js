const frame = document.querySelector(".frame");
const data = ["/file/landmark/namsanTower.jpg", "/file/landmark/1.jpg"];
let imageCount = 0;

data.forEach((img) => appendCard(img));

let startX = 0,
  startY = 0,
  moveX = 0,
  moveY = 0;
let current = frame.querySelector(".card:last-child");

initCard(current);

function initCard(card) {
  card.addEventListener("pointerdown", onPointerDown);
}

function appendCard(img) {
  const firstCard = frame.children[0];
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.style.backgroundImage = `url(${img})`;
  if (firstCard) frame.insertBefore(newCard, firstCard);
  else frame.appendChild(newCard);
  imageCount++;
}

function onPointerDown(e) {
  startX = e.clientX;
  startY = e.clientY;
  current.addEventListener("pointermove", onPointerMove);
  current.addEventListener("pointerup", onPointerUp);
  current.addEventListener("pointerleave", onPointerUp);
}

function onPointerMove(e) {
  moveX = e.clientX - startX;
  moveY = e.clientY - startY;

  setTransform(moveX, moveY, (moveX / innerWidth) * 50);
}

function onPointerUp() {
  current.removeEventListener("pointermove", onPointerMove);
  current.removeEventListener("pointerup", onPointerUp);
  current.removeEventListener("pointerleave", onPointerUp);
  if (Math.abs(moveX) > frame.clientWidth / 2) {
    current.removeEventListener("pointerdown", onPointerDown);
    complete();
  } else {
    cancle();
  }
}

function complete() {
  let flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3;
  let flyY = (moveY / moveX) * flyX;
  setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth);

  const prev = current;
  const next = current.previousElementSibling;
  if (next) initCard(next);
  current = next;
  appendCard(data[imageCount % data.length]);
  setTimeout(() => frame.removeChild(prev), innerWidth);
}

function cancle() {
  setTransform(0, 0, 0);
}

function setTransform(x, y, deg, duration) {
  current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
  if (duration) current.style.transition = `transform ${duration}ms`;
}

// 업로드 클릭 시
const upload = document.querySelector(".upload");

upload.addEventListener("click", () => {
  location.href = "/world/upload";
});
