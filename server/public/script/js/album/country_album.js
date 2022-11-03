// 업로드 클릭 시
const upload = document.querySelector(".upload");

upload.addEventListener("click", () => {
  const url = window.location.href;
  location.href = `${url}/upload`;
});

const img = document.querySelectorAll(".image");

img.forEach((i) =>
  i.addEventListener("click", () => {
    console.log("clicked!");
  })
);
