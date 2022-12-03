// 대체 버튼을 클릭했을 때, input 이 실행
const upload_button = document.querySelector(".upload_button");
const add_button = document.querySelector(".add_button");
const hidden_uploadFile_input = document.getElementById(
  "hidden_uploadFile_input"
);

upload_button.addEventListener("click", () => {
  hidden_uploadFile_input.click();
});

add_button.addEventListener("click", () => {
  hidden_uploadFile_input.click();
});

// 파일을 추가했을 때 미리보기 기능
const image = document.querySelector(".image");
const uploadBox_visibleNormal = image.querySelector(".uploadBox_visibleNormal");
const uploadBox_selectVisible = image.querySelector(".uploadBox_selectVisible");
const upload_imageInfo_container = document.querySelector(
  ".upload_imageInfo_container"
);
const del_button = document.querySelector(".del_button");
const left_button = document.querySelector(".left_button");
const right_button = document.querySelector(".right_button");
const upload_submitButton = document.querySelector(".upload_submitButton");

let file_array = [];
let count = 0;

// input 값에 file 이 입력될 경우
hidden_uploadFile_input.addEventListener("change", (event) => {
  const new_imageFiles = new Array(...event.target.files);
  new_imageFiles.map((i) => file_array.push(i));
  hidden_uploadFile_input.value = "";
  readFile(file_array[count]);
  setButton(file_array.length, count);
});

// 이미지 삭제
del_button.addEventListener("click", () => {
  file_array.splice(count, 1);
  const arrLength = file_array.length;

  if (count === file_array.length) {
    count--;
  }

  if (arrLength) {
    readFile(file_array[count]);
  } else {
    count = 0;
    changeStyle("", "none");
    error(false);
  }
  setButton(arrLength, count);
});

// 좌측 버튼
left_button.addEventListener("click", () => {
  count--;
  readFile(file_array[count]);
  setButton(file_array.length, count);
});

// 우측 버튼
right_button.addEventListener("click", () => {
  count++;
  readFile(file_array[count]);
  setButton(file_array.length, count);
});

/** 배열의 파일 읽기 */
function readFile(arr) {
  const reader = new FileReader();
  reader.onload = (data) => {
    // 비디오 파일 읽기
    const videoArr = file_array.filter((i) => i.type === "video/mp4");
    if (videoArr.length) {
      if (file_array.length > 1) {
        // 비디오 파일이 2개 이상일 경우 에러 아이콘 변경 및 에러 메세지 출력
        error(true);
      } else {
        const videoBox = document.querySelector(".videoBox");
        const video = document.querySelector(".video");
        const image = document.querySelector(".image");
        image.classList.add("hidden");
        videoBox.classList.remove("hidden");
        video.innerHTML = `<source src=${data.target.result} type="video/mp4">`;
        upload_imageInfo_container.style.animation =
          "imageInfo_appear 0.5s ease-out forwards";
      }
    } else {
      // 이미지 파일인 경우 갯수 제한 없음
      changeStyle("none", "flex", data.target.result);
    }
  };
  reader.readAsDataURL(arr);
}

/** 동영상 파일 두 개 이상 또는 이미지와 섞일 경우 하나만 올리도록 에러 출력 */
function error(bool) {
  const icon = document.querySelector(".img_icon");
  const errorMsg = document.querySelector(".errorMsg");
  icon.className = "fas fa-photo-video fa-4x";
  icon.classList.add("img_icon");
  errorMsg.innerText = "";

  if (bool) {
    icon.className = "fas fa-exclamation-circle fa-4x";
    icon.classList.add("img_icon");
    errorMsg.innerText = "하나의 동영상만 업로드 할 수 있습니다.";
  }

  // 에러 출력 후 남아있을 비디오 또는 이미지 파일 지우기
  file_array = [];
}

/** 이미지 선택 or 삭제 시 display 변경 및 배경 변경 */
function changeStyle(normal, select, data) {
  uploadBox_visibleNormal.style.display = `${normal}`;
  uploadBox_selectVisible.style.display = `${select}`;
  if (select === "flex") {
    upload_imageInfo_container.style.animation =
      "imageInfo_appear 0.5s ease-out forwards";
    image.style.background = `url(${data}) no-repeat center/cover`;
  } else {
    upload_imageInfo_container.style.animation =
      "imageInfo_disappear 0.5s ease-out forwards";
    image.style.background = "";
    error(false);
  }
}

/** 배경이 출력하는 배열의 index 값에 따라 좌우 버튼의 UI 변경 */
function setButton(length, count) {
  left_button.style.visibility = "visible";
  right_button.style.visibility = "visible";
  if (length === 1) {
    left_button.style.visibility = "hidden";
    right_button.style.visibility = "hidden";
  } else {
    if (count === 0) {
      left_button.style.visibility = "hidden";
    } else if (count + 1 === length) {
      right_button.style.visibility = "hidden";
    }
  }
}

/** 업로드 버튼을 클릭했을 때 input 값을 저장해서 서버로 보냄 */
upload_submitButton.addEventListener("click", () => {
  let dataTransfer = new DataTransfer();

  file_array.forEach((i) => dataTransfer.items.add(i));
  hidden_uploadFile_input.files = dataTransfer.files;
});
