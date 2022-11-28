// 프로필 정보 중복되는 것이 있거나, 빈 값이 경우 error
const errors = document.querySelectorAll(".true");

errors.forEach((err) => {
  switch (err.value) {
    case "name_exists":
      const nameExErr = document.querySelector(".nameErr");
      nameExErr.innerText = "중복된 이름입니다.";
      nameExErr.style.visibility = "visible";
      break;
    case "name_null":
      const nameNuErr = document.querySelector(".nameErr");
      nameNuErr.innerText = "이름을 입력해주세요.";
      nameNuErr.style.visibility = "visible";
      break;
    case "email_exists":
      const emailExErr = document.querySelector(".emailErr");
      emailExErr.innerText = "중복된 이메일입니다.";
      emailExErr.style.visibility = "visible";
      break;
    case "email_null":
      const emailNuErr = document.querySelector(".emailErr");
      emailNuErr.innerText = "이메일을 입력해주세요.";
      emailNuErr.style.visibility = "visible";
      break;
    case "nowPwd_null":
      const nowPwdNuErr = document.querySelector(".nowPwdErr");
      nowPwdNuErr.innerText = "현재 비밀번호를 입력해주세요.";
      nowPwdNuErr.style.visibility = "visible";
      break;
    case "nowPwd_noMatch":
      const nowPwdNoErr = document.querySelector(".nowPwdErr");
      nowPwdNoErr.innerText = "현재 비밀번호가 일치하지 않습니다.";
      nowPwdNoErr.style.visibility = "visible";
      break;
    case "newPwd_null":
      const newPwdNuErr = document.querySelector(".changePwdErr");
      newPwdNuErr.innerText = "새 비밀번호를 입력해주세요.";
      newPwdNuErr.style.visibility = "visible";
      break;
    case "newPwd_noMatch":
      const newPwdNoErr = document.querySelector(".changePwdErr");
      newPwdNoErr.innerText = "새 비밀번호가 일치하지 않습니다.";
      newPwdNoErr.style.visibility = "visible";
      break;
  }
});

// 프로필 이미지 변경
const changeProfileImg = document.querySelector(".changeProfileImg");
const hiddenInput = document.getElementById("hidden_profileImg_input");

// 가짜 버튼(div)을 클릭하면 숨겨진 hidden input 이 실행
changeProfileImg.addEventListener("click", () => {
  hiddenInput.click();
});

hiddenInput.addEventListener("change", async (event) => {
  const newProfile = event.target.files[0];

  const reader = new FileReader();
  reader.onload = async (data) => {
    const img = document.querySelector(".img");
    img.src = data.target.result;
  };
  reader.readAsDataURL(newProfile);
});
