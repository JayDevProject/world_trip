const account_error = document.querySelectorAll(".error");

const userId_errorMsg = document.getElementById("account_userId_errorMsg");
const pwd_errorMsg = document.getElementById("account_pwd_errorMsg");
const pwd_check_errorMsg = document.getElementById(
  "account_pwd_check_errorMsg"
);
const nickname_errorMsg = document.getElementById("account_nickname_errorMsg");
const email_errorMsg = document.getElementById("account_email_errorMsg");

const sendCode = document.getElementById("sendCode");

const error_id = new Map();
const error_value = new Map();
let count = 0;

account_error.forEach((i, idx) => {
  error_id[idx] = i.id;
  error_value[idx] = i.value;
  count++;
});

for (let i = 0; i < count; i++) {
  if (error_id[i]) {
    let error_list = error_id[i].split("_")[0];
    let error_type = error_id[i].split("_")[1];
    null_msg(error_list, error_type, error_value[i]);
    exist_msg(error_list, error_type, error_value[i]);
    password_noMatch(error_list, error_type, error_value[i]);
    emailCode_noMatch(error_list, error_type, error_value[i]);
  }
}

/** 정보 누락 검사. */
function null_msg(list, type, value) {
  if (type === "null" && value === "true") {
    switch (list) {
      case "userId":
        userId_errorMsg.innerText = "필수 정보입니다.";
        userId_errorMsg.style.display = "inline";
        break;
      case "pwd":
        pwd_errorMsg.innerText = "필수 정보입니다.";
        pwd_errorMsg.style.display = "inline";
        break;
      case "pwdCheck":
        pwd_check_errorMsg.innerText = "필수 정보입니다.";
        pwd_check_errorMsg.style.display = "inline";
        break;
      case "nickname":
        nickname_errorMsg.innerText = "필수 정보입니다.";
        nickname_errorMsg.style.display = "inline";
        break;
      case "email":
        email_errorMsg.innerText = "필수 정보입니다.";
        email_errorMsg.style.display = "inline";
        break;
    }
  }
  return;
}

/** 중복 검사 */
function exist_msg(list, type, value) {
  if (type === "exist" && value === "true") {
    switch (list) {
      case "userId":
        userId_errorMsg.innerText = "중복된 아이디입니다.";
        userId_errorMsg.style.display = "inline";
        break;
      case "nickname":
        nickname_errorMsg.innerText = "중복된 닉네임입니다.";
        nickname_errorMsg.style.display = "inline";
        break;
      case "email":
        email_errorMsg.innerText = "이미 가입된 이메일입니다.";
        email_errorMsg.style.display = "inline";
        break;
    }
  }
  return;
}

/** 비밀번호 확인 검사 */
function password_noMatch(list, type, value) {
  if (list === "pwdCheck" && type === "noMatch" && value === "true") {
    pwd_check_errorMsg.innerText = "비밀번호가 일치하지 않습니다.";
    pwd_check_errorMsg.style.display = "inline";
  }
  return;
}

/** 이메일 코드 인증 검사 */
function emailCode_noMatch(list, type, value) {
  if (list === "emailCode" && type === "noMatch" && value === "true") {
    email_errorMsg.innerText = "이메일 코드가 일치하지 않습니다.";
    email_errorMsg.style.display = "inline";
  }

  if (list === "emailCode" && type === "certify" && value === "true") {
    email_errorMsg.innerText = "이메일 인증을 진행해주세요.";
    email_errorMsg.style.display = "inline";
  }
}

/** 이메일 인증 받기 */
sendCode.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const url = "http://localhost:4000/account";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailVertify: email }),
  };

  fetch(url, option).then((response) => console.log(response));
});
