import bcrypt from "bcrypt";
import User from "../../database/User.js";
import "express-session";

export const getLogin = (req, res) => {
  res.render("ejs/login/login.ejs");
};

export const postLogin = async (req, res) => {
  const {
    body: { login_userId, login_password },
  } = req;
  let error = false;
  let userIdError = { code: "", error: false },
    passwordError = { code: "", error: false };
  let user = "";

  const sign = await User.exists({ userId: login_userId });

  // 가입된 아이디가 없는 경우
  if (!sign) {
    error = true;
    userIdError = { code: "userId_noSign", error: true };
  }

  // 아이디 입력하지 않았을 경우
  if (!login_userId) {
    error = true;
    userIdError = { code: "userId_null", error: true };
  }

  // 비밀번호 입력을 하지 않았을 경우
  if (!login_password) {
    error = true;
    passwordError = { code: "password_null", error: true };
  }

  // 비밀번호, 아이디 입력 값이 있는 경우
  if (login_userId && login_password && sign) {
    // req.session 을 활용하기 위해 전역변수에 값을 저장
    user = await User.findOne({ userId: login_userId });
    const pwdInspect = await bcrypt.compare(login_password, user.password);

    // 저장된 아이디의 비밀번호와 비교
    if (!pwdInspect) {
      error = true;
      passwordError = { code: "password_noMatch", error: true };
    }
  }

  let errorCode = [
    { errorId: userIdError.code, error: userIdError.error },
    { errorId: passwordError.code, error: passwordError.error },
  ];

  if (error) {
    return res.render("ejs/login/login.ejs", { errorCode });
  } else {
    // 로그인 정보 저장
    req.session.userId = user._id;
    req.session.nickname = user.nickname;

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
  return res.redirect("/");
};

export const getEditProfile = async (req, res) => {
  const { nickname } = req.session;
  const user = await User.findOne({ nickname });

  return res.render("pug/album/editProfile.pug", { nickname, user });
};

export const postEditProfile = async (req, res) => {
  const {
    file,
    body: { name, introduce, email, nowPwd, changePwd, checkPwd },
    session: { nickname, userId },
  } = req;

  let error = false;
  let nicknameErr = { code: "", error: false },
    emailErr = { code: "", error: false },
    nowPwdErr = { code: "", error: false },
    newPwdErr = { code: "", error: false };
  let encodingPassword = "";

  const user = await User.findOne({ nickname });
  const newName = await User.exists({ userId });
  const newEmail = await User.exists({ email });

  if (newName && name !== user.nickname) {
    error = true;
    nicknameErr = { code: "name_exists", error: true };
  }

  if (!name) {
    error = true;
    nicknameErr = { code: "name_null", error: true };
  }

  if (newEmail && email !== user.email) {
    error = true;
    emailErr = { code: "email_exists", error: true };
  }

  if (!email) {
    error = true;
    emailErr = { code: "email_null", error: true };
  }

  if (!nowPwd && !changePwd && !checkPwd) {
    console.log("pass");
  } else {
    const pwdInspect = await bcrypt.compare(nowPwd, user.password);

    if (!pwdInspect) {
      error = true;
      nowPwdErr = { code: "nowPwd_noMatch", error: true };
    }

    if (changePwd !== checkPwd) {
      error = true;
      newPwdErr = { code: "newPwd_noMatch", error: true };
    }

    if (!nowPwd) {
      error = true;
      nowPwdErr = { code: "nowPwd_null", error: true };
    }

    if (!changePwd || !checkPwd) {
      error = true;
      newPwdErr = { code: "newPwd_null", error: true };
    }

    encodingPassword = await bcrypt.hash(changePwd, 5);
  }

  let errorCode = [
    { errorId: nicknameErr.code, error: nicknameErr.error },
    { errorId: emailErr.code, error: emailErr.error },
    { errorId: nowPwdErr.code, error: nowPwdErr.error },
    { errorId: newPwdErr.code, error: newPwdErr.error },
  ];

  if (error) {
    return res.render("pug/album/editProfile.pug", {
      nickname,
      user,
      errorCode,
    });
  } else {
    // 프로필 이미지 변경 값이 없으면 현재 프로필 이미지 유지
    // 비밀번호 변경 값이 없으면 현재 비밀번호 유지
    await User.findOneAndUpdate(
      { _id: userId },
      {
        profileImg: file ? file.filename : user.profileImg,
        nickname: name,
        introduce:
          introduce === "" ? "[ 입력된 소개글이 없습니다. ]" : introduce,
        email: email,
        password: encodingPassword ? encodingPassword : user.password,
      }
    );

    // 닉네임 변경되는 경우 url 을 위해 수정
    req.session.nickname = name;

    return res.redirect(`/trip/${name}`);
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
