// 다른 게시물 UI 설정
const contents = document.querySelectorAll(".contents");

contents.forEach((i) => {
  // img 배경 색 랜덤으로 변경
  const img = i.firstChild.querySelector(".img");

  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  img.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.5)`;

  // 마우스 클릭 후 뗐을 때 배경 애니메이션
  i.addEventListener("mouseup", () => {
    i.animate(
      [
        {
          backgroundColor: "rgba(141, 141, 141, 0.5)",
          border: "1px solid white",
        },
        {
          backgroundColor: "rgba(141, 141, 141, 0)",
          border: "1px solid rgba(22, 22, 22, 0.5",
        },
      ],
      500
    );
  });
});

// 댓글 작성 시 ajax
// 댓글 form 과 댓글 input 가져오기
const commentForm = document.querySelector(".commentForm");
const commentInput = document.querySelector(".commentInput");

// submit 할 현재 게시물의 url
const url = window.location.href;

commentForm.addEventListener("submit", async (event) => {
  // 새로고침 제거
  event.preventDefault();

  const text = commentInput.value;

  // 댓글 입력 값이 있는 경우에만 댓글 추가
  if (text) {
    await fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        addComment(data);
      });
  }
});

/** 댓글 추가 */
function addComment(data) {
  // 댓글 입력 후 input 값 비우기
  commentInput.value = "";

  // 댓글 목록을 나열할 리스트 컨테이너
  const ul = document.querySelector(".commentUl");

  // 댓글 최상위 부모 컨테이너
  const commentBox = document.createElement("div");
  commentBox.className = "commentBox";

  // 이미지 컨테이너(commentBox 가 부모)
  const viewImgBox = document.createElement("div");
  viewImgBox.className = "viewImgBox";
  // 유저 프로필 이미지
  const img = document.createElement("img");

  // 댓글 컨테이너(commentBox 가 부모)
  const viewCommentBox = document.createElement("div");
  viewCommentBox.className = "viewCommentBox";

  // 댓글 컨테이너의 유저 정보를 나타낼 컨테이너(viewCommentBox 가 부모)
  const underViewName = document.createElement("div");
  underViewName.className = "underViewName";

  // 댓글 작성자의 이름 및 작성된 날짜
  const author = document.createElement("div");
  const createAt = document.createElement("div");

  // 댓글 컨테이너의 댓글을 나타낼 컨테이너(viewCommentBox 가 부모)
  const underViewText = document.createElement("div");
  underViewText.className = "underViewText";
  // 댓글
  const text = document.createElement("div");

  // 유저 프로필 이미지, 작성자, 작성된 날짜, 댓글을 받아온 정보로부터 입력
  img.src = data.profileImg;
  author.innerText = data.author;
  createAt.innerText = data.createAt;
  text.innerText = data.text;

  underViewText.appendChild(text);
  underViewName.appendChild(author);
  underViewName.appendChild(createAt);
  viewCommentBox.appendChild(underViewName);
  viewCommentBox.appendChild(underViewText);
  viewImgBox.appendChild(img);
  commentBox.appendChild(viewImgBox);
  commentBox.appendChild(viewCommentBox);
  ul.prepend(commentBox);
}
