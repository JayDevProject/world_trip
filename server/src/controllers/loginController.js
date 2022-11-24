import bcrypt from "bcrypt";
import User from "../../database/User.js";
import "express-session";

export const getLogin = (req, res) => {
  res.render("ejs/login/login.ejs");
};

export const postLogin = async (req, res) => {
  const login_value = req.body;
  const login_list = Object.keys(login_value);
  let login_error = false,
    userId_loginError = { code: "", error: false },
    password_loginError = { code: "", error: false };

  // 아이디와 비밀번호의 name 값과 value 를 각각 전달.
  // name 은 switch 구문에서 구별하는 용도로 사용
  for (let i = 0; i < login_list.length; i++) {
    let value = login_value[login_list[i]];
    login_null(login_list[i], value);
  }

  function login_null(list, value) {
    if (value === "") {
      switch (list) {
        case "login_userId":
          login_error = true;
          userId_loginError.code = "userId_loginNull";
          userId_loginError.error = true;
          break;
        case "login_password":
          login_error = true;
          password_loginError.code = "pwd_loginNull";
          password_loginError.error = true;
          break;
      }
    }
    return;
  }

  const login_userInfo = await User.findOne({
    userId: login_value.login_userId,
  });

  // 입력한 로그인 유저 정보가 있고, 비밀번호 값이 null 이 아닌 경우 유효성 검사
  // 비밀번호가 일치하지 않을 경우 에러
  if (login_userInfo && !password_loginError.error) {
    const pwd_inspect = await bcrypt.compare(
      login_value.login_password,
      login_userInfo.password
    );

    if (!pwd_inspect) {
      login_error = true;
      password_loginError.code = "pwd_noMatch";
      password_loginError.error = true;
    }
  }

  let login_info = [
    {
      id: userId_loginError.code,
      class: "error",
      error: userId_loginError.error,
    },
    {
      id: password_loginError.code,
      class: "error",
      error: password_loginError.error,
    },
  ];

  if (login_error) {
    return res.render("ejs/login/login.ejs", { login_info });
  } else {
    // 로그인 정보 저장
    req.session.userId = login_userInfo._id;
    req.session.nickname = login_userInfo.nickname;

    // 비로그인 상태로 url 접근 시, 로그인 성공 이후 접근하려는 url 로 이동
    if (req.session.url) {
      return res.redirect(req.session.url);
    }
    return res.redirect("/trip");
  }
};

export const getAccount = (req, res) => {
  res.render("ejs/login/account.ejs");
};

export const postAccount = async (req, res) => {
  const { password, password_check, emailCode } = req.body;
  const account_value = req.body;
  const account_list = Object.keys(account_value);
  let encodingPassword = "",
    account_error = false,
    userId_error = { code: "", error: false },
    pwd_error = { code: "", error: false },
    pwdCheck_error = { code: "", error: false },
    nickname_error = { code: "", error: false },
    email_error = { code: "", error: false };

  // 비밀번호 유효성 검사
  if (password === password_check && password !== undefined) {
    encodingPassword = await bcrypt.hash(password, 5);
  } else {
    account_error = true;
    pwdCheck_error.code = "pwdCheck_noMatch";
    pwdCheck_error.error = true;
  }

  console.log(typeof req.session.emailCode);
  console.log(typeof emailCode);

  // 이메일 인증 코드 검사
  // 인증번호 전송받지 않을 경우와 인증 코드가 다를 경우를 구분
  if (req.session.emailCode === undefined) {
    account_error = true;
    email_error.code = "emailCode_certify";
    email_error.error = true;
  } else if (req.session.emailCode !== parseInt(emailCode)) {
    account_error = true;
    email_error.code = "emailCode_noMatch";
    email_error.error = true;
  }

  for (let i = 0; i < account_list.length; i++) {
    let value = account_value[account_list[i]];
    error_null(account_list[i], value);
    error_exist(account_list[i], value);
  }

  function error_null(list, value) {
    if (value === "") {
      switch (list) {
        case "userId":
          account_error = true;
          userId_error.code = "userId_null";
          userId_error.error = true;
          break;
        case "password":
          account_error = true;
          pwd_error.code = "pwd_null";
          pwd_error.error = true;
          break;
        case "password_check":
          account_error = true;
          pwdCheck_error.code = "pwdCheck_null";
          pwdCheck_error.error = true;
          break;
        case "nickname":
          account_error = true;
          nickname_error.code = "nickname_null";
          nickname_error.error = true;
          break;
        case "email":
          account_error = true;
          email_error.code = "email_null";
          email_error.error = true;
          break;
      }
    }
    return;
  }

  async function error_exist(list, value) {
    if (
      value !== "password" &&
      value !== "password_check" &&
      (await User.exists({ list: value }))
    ) {
      switch (list) {
        case "userId":
          account_error = true;
          userId_error.code = "userId_exist";
          userId_error.error = true;
          break;
        case "nickname":
          account_error = true;
          nickname_error.code = "nickname_exist";
          nickname_error.error = true;
          break;
        case "email":
          account_error = true;
          email_error.code = "email_exist";
          email_error.error = true;
          break;
      }
    }
    return;
  }

  let account_info = [
    { id: userId_error.code, class: "error", error: userId_error.error },
    { id: pwd_error.code, class: "error", error: pwd_error.error },
    { id: pwdCheck_error.code, class: "error", error: pwdCheck_error.error },
    { id: nickname_error.code, class: "error", error: nickname_error.error },
    { id: email_error.code, class: "error", error: email_error.error },
  ];

  if (account_error === false) {
    await User.create({
      userId: account_value.userId,
      password: encodingPassword,
      nickname: account_value.nickname,
      email: account_value.email,
    });
    return res.redirect("/");
  } else {
    return res.render("ejs/login/account.ejs", { account_info });
  }
};

export const getLoginHelp = (req, res) => {
  res.render("ejs/login/loginHelp.ejs");
};

export const postLoginHelp = async (req, res) => {
  const { find, email } = req.body;

  const emailExist = await User.exists({ email });

  if (emailExist) {
    switch (find) {
      case "findId":
        const findId = await User.findOne({ email });
        return res.render("/");
      case "findPassword":
        const findPassword = await User.findOne({ email });
        return res.render("/");
    }
  } else {
    return res.render("ejs/login/loginHelp.ejs");
  }
};
