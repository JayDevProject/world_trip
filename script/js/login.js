const login_error = document.querySelectorAll(".error");

const userId_errorMsg = document.getElementById("login_userId_errorMsg");
const password_errrorMsg = document.getElementById("login_password_errorMsg");

const error_id = new Map();
const error_value = new Map();

login_error.forEach((i, idx) => {
  error_id[idx] = i.id;
  error_value[idx] = i.value;
});

for (let i = 0; i < login_error.length; i++) {
  if (error_id[i]) {
    let error_list = error_id[i].split("_")[0];
    let error_type = error_id[i].split("_")[1];
    login_null(error_list, error_value[i], error_type);
    login_noMatch(error_value[i], error_type);
  }
}

function login_null(list, value, type) {
  if (type === "loginNull" && value) {
    switch (list) {
      case "userId":
        userId_errorMsg.innerText = "아이디를 입력해주세요.";
        break;
      case "pwd":
        password_errrorMsg.innerText = "비밀번호를 입력해주세요.";
        break;
    }
  }
}

function login_noMatch(value, type) {
  if (type === "noMatch" && value) {
    password_errrorMsg.innerText = "아이디 또는 비밀번호가 일치하지 않습니다.";
  }
}
