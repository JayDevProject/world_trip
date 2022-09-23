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
const upload_imageBox = document.querySelector(".upload_imageBox");
const upload_imageBox_visibleNormal = upload_imageBox.querySelector(
  ".upload_imageBox_visibleNormal"
);
const upload_imageBox_selectVisible = upload_imageBox.querySelector(
  ".upload_imageBox_selectVisible"
);
const upload_imageInfo_container = document.querySelector(
  ".upload_imageInfo_container"
);
const del_button = document.querySelector(".del_button");
const left_button = document.querySelector(".left_button");
const right_button = document.querySelector(".right_button");
const upload_submitButton = document.querySelector(".upload_submitButton");

let image_array = [];
let count = 0;

// input 값에 file 이 입력될 경우
hidden_uploadFile_input.addEventListener("change", (event) => {
  const new_imageFiles = new Array(...event.target.files);
  new_imageFiles.map((i) => image_array.push(i));
  hidden_uploadFile_input.value = "";
  readFile(image_array[count]);
  setButton(image_array.length, count);
});

// 이미지 삭제
del_button.addEventListener("click", () => {
  image_array.splice(count, 1);
  const arrLength = image_array.length;

  if (count === image_array.length) {
    count--;
  }

  if (arrLength) {
    readFile(image_array[count]);
  } else {
    count = 0;
    changeStyle("", "none");
  }
  setButton(arrLength, count);
});

// 좌측 버튼
left_button.addEventListener("click", () => {
  count--;
  readFile(image_array[count]);
  setButton(image_array.length, count);
});

// 우측 버튼
right_button.addEventListener("click", () => {
  count++;
  readFile(image_array[count]);
  setButton(image_array.length, count);
});

/** 배열의 이미지 파일 읽기 */
function readFile(arr) {
  const reader = new FileReader();
  reader.onload = (data) => {
    changeStyle("none", "flex", data.target.result);
  };
  reader.readAsDataURL(arr);
}

/** 이미지 선택 or 삭제 시 display 변경 및 배경 변경 */
function changeStyle(normal, select, data) {
  upload_imageBox_visibleNormal.style.display = `${normal}`;
  upload_imageBox_selectVisible.style.display = `${select}`;
  if (select === "flex") {
    upload_imageInfo_container.style.animation =
      "imageInfo_appear 0.5s ease-out forwards";
    upload_imageBox.style.background = `url(${data}) no-repeat center/cover`;
  } else {
    upload_imageInfo_container.style.animation =
      "imageInfo_disappear 0.5s ease-out forwards";
    upload_imageBox.style.background = "";
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

  image_array.forEach((i) => dataTransfer.items.add(i));
  hidden_uploadFile_input.files = dataTransfer.files;
});
