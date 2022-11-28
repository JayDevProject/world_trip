const errors = document.querySelectorAll(".true");

const userIdErr = document.getElementById("login_userId_errorMsg");
const passwordErr = document.getElementById("login_password_errorMsg");

errors.forEach((error) => {
  switch (error.value) {
    case "userId_null":
      userIdErr.innerText = "아이디를 입력해주세요.";
      break;
    case "userId_noSign":
      userIdErr.innerText = "일치하는 아이디가 없습니다.";
      break;
    case "password_null":
      passwordErr.innerText = "비밀번호를 입력해주세요.";
      break;
    case "password_noMatch":
      passwordErr.innerText = "비밀번호가 일치하지 않습니다.";
      break;
  }
});
