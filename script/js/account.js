const account_error = document.querySelectorAll(".error");

const userId_errorMsg = document.getElementById("account_userId_errorMsg");
const pwd_errorMsg = document.getElementById("account_pwd_errorMsg");
const pwd_check_errorMsg = document.getElementById(
  "account_pwd_check_errorMsg"
);
const nickname_errorMsg = document.getElementById("account_nickname_errorMsg");
const email_errorMsg = document.getElementById("account_email_errorMsg");

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
    password_noMatch(error_type, error_value[i]);
  }
}

function null_msg(list, type, value) {
  if (type === "null" && value === "true") {
    switch (list) {
      case "userId":
        userId_errorMsg.innerText = "필수 정보입니다.";
        userId_errorMsg.style.visibility = "visible";
        break;
      case "pwd":
        pwd_errorMsg.innerText = "필수 정보입니다.";
        pwd_errorMsg.style.visibility = "visible";
        break;
      case "pwdCheck":
        pwd_check_errorMsg.innerText = "필수 정보입니다.";
        pwd_check_errorMsg.style.visibility = "visible";
        break;
      case "nickname":
        nickname_errorMsg.innerText = "필수 정보입니다.";
        nickname_errorMsg.style.visibility = "visible";
        break;
      case "email":
        email_errorMsg.innerText = "필수 정보입니다.";
        email_errorMsg.style.visibility = "visible";
        break;
    }
  }
  return;
}

function exist_msg(list, type, value) {
  if (type === "exist" && value === "true") {
    switch (list) {
      case "userId":
        userId_errorMsg.innerText = "중복된 아이디입니다.";
        userId_errorMsg.style.visibility = "visible";
        break;
      case "nickname":
        nickname_errorMsg.innerText = "중복된 닉네임입니다.";
        nickname_errorMsg.style.visibility = "visible";
        break;
      case "email":
        email_errorMsg.innerText = "이미 가입된 이메일입니다.";
        email_errorMsg.style.visibility = "visible";
        break;
    }
  }
  return;
}

function password_noMatch(type, value) {
  if (type === "noMatch" && value === "true") {
    pwd_check_errorMsg.innerText = "비밀번호가 일치하지 않습니다.";
    pwd_check_errorMsg.style.visibility = "visible";
  }
  return;
}
