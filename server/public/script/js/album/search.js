const users = document.querySelectorAll(".userBox");
const imageBoxes = document.querySelectorAll(".imageBox");

/** 유저 검색 후 클릭 시 유저 프로필로 이동 */
users.forEach((user) =>
  user.addEventListener("click", () => {
    const username = user.querySelector("input").value;

    window.location.href = `/trip/${username}`;
  })
);

/** 이미지 검색 후 클릭 시 이미지 앨범으로 이동 */
imageBoxes.forEach((image) =>
  image.addEventListener("click", () => {
    const username = image.querySelector(".hiddenNickname").value;
    const fileId = image.querySelector(".hiddenFileId").value;

    window.location.href = `/trip/${username}/${fileId}`;
  })
);

// 유저, 이미지, 비디오 클릭 시 검색 view page 다르게 적용
const userView = document.querySelector(".user");
const imageView = document.querySelector(".image");
const videoView = document.querySelector(".video");

const userPage = document.querySelector(".userPage");
const imagePage = document.querySelector(".imagePage");
const videoPage = document.querySelector(".videoPage");

userPage.addEventListener("click", () => {
  selectStyle(userPage);
  deselectStyle(imagePage);
  deselectStyle(videoPage);
  viewHidden(userView, imageView, videoView);
});

imagePage.addEventListener("click", async () => {
  selectStyle(imagePage);
  deselectStyle(userPage);
  deselectStyle(videoPage);
  viewHidden(imageView, userView, videoView);
});

videoPage.addEventListener("click", () => {
  selectStyle(videoPage);
  deselectStyle(userPage);
  deselectStyle(imagePage);
  viewHidden(videoView, imageView, userView);
});

/** 다른 페이지 뷰로 넘어갈 경우 선택 해제 style 적용 */
function deselectStyle(deselect) {
  deselect.classList.remove("fontWhite");
  deselect.classList.add("fontGray");
  deselect.style.border = "none";
}

/** 링크와 보여지는 페이지 뷰가 일치할 경우 선택된 style 적용  */
function selectStyle(select) {
  select.classList.remove("fontGray");
  select.classList.add("fontWhite");
  select.style.borderBottom = "1px solid white";
}

/** page view 숨김 및 선택된 페이지 활성화 */
function viewHidden(select, deselect_1, deselect_2) {
  select.style.display = "block";
  deselect_1.style.display = "none";
  deselect_2.style.display = "none";
}
