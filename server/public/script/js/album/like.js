const notLikeIcon = document.querySelector(".notLikeIcon");
const likeIcon = document.querySelector(".likeIcon");
const likeNum = document.querySelector(".likeNum");

/** 좋아요 버튼을 눌렀을 경우 */
notLikeIcon.addEventListener("click", async () => {
  const like = true;

  likeIcon.classList.remove("hidden");
  notLikeIcon.classList.add("hidden");

  ajax(like);
});

likeIcon.addEventListener("click", async () => {
  const like = false;

  notLikeIcon.classList.remove("hidden");
  likeIcon.classList.add("hidden");

  ajax(like);
});

/** 버튼을 클릭했을 때 비동기 통신 */
async function ajax(like) {
  // url 은 photo.js 에서 값을 가져와 사용
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ like }),
  })
    .then((response) => response.json())
    .then((data) => (likeNum.innerText = data));
}
