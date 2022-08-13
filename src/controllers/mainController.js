import bcrypt from "bcrypt";
import User from "../../database/User.js";

export const login = (req, res) => {
  res.render("login/login.ejs");
};

export const getAccount = (req, res) => {
  res.render("login/account.ejs");
};

export const postAccount = async (req, res) => {
  const { password, password_check } = req.body;
  const account_obj = req.body;
  const account_list = Object.keys(account_obj);
  let encodingPassword = "",
    error = false,
    userId_error = { code: "", error: false },
    pwd_error = { code: "", error: false },
    pwdCheck_error = { code: "", error: false },
    nickname_error = { code: "", error: false },
    email_error = { code: "", error: false };

  if (password === password_check) {
    encodingPassword = await bcrypt.hash(password, 5);
  } else {
    error = true;
    pwdCheck_error.code = "pwdCheck_noMatch";
    pwdCheck_error.error = true;
  }

  for (let i = 0; i < account_list.length; i++) {
    let account_value = account_obj[account_list[i]];
    error_null(account_list[i], account_value);
    error_exist(account_list[i], account_value);
  }

  function error_null(list, value) {
    if (value === "") {
      switch (list) {
        case "userId":
          error = true;
          userId_error.code = "userId_null";
          userId_error.error = true;
          break;
        case "password":
          error = true;
          pwd_error.code = "pwd_null";
          pwd_error.error = true;
          break;
        case "password_check":
          error = true;
          pwdCheck_error.code = "pwdCheck_null";
          pwdCheck_error.error = true;
          break;
        case "nickname":
          error = true;
          nickname_error.code = "nickname_null";
          nickname_error.error = true;
          break;
        case "email":
          error = true;
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
          error = true;
          userId_error.code = "userId_exist";
          userId_error.error = true;
          break;
        case "nickname":
          error = true;
          nickname_error.code = "nickname_exist";
          nickname_error.error = true;
          break;
        case "email":
          error = true;
          email_error.code = "email_exist";
          email_error.error = true;
          break;
      }
    }
    return;
  }

  let info = [
    { id: userId_error.code, class: "error", error: userId_error.error },
    { id: pwd_error.code, class: "error", error: pwd_error.error },
    { id: pwdCheck_error.code, class: "error", error: pwdCheck_error.error },
    { id: nickname_error.code, class: "error", error: nickname_error.error },
    { id: email_error.code, class: "error", error: email_error.error },
  ];

  /*
  if(error === false) {
    await User.create({
      userId,
      password: encodingPassword,
      nickname,
      email,
    });
    return res.redirect("/");
  } else {
    return res.render("login/account.ejs", { pwd_noSame });
  }
*/

  if (error) {
    return res.render("login/account.ejs", {
      info,
    });
  }
};

export const getLoginHelp = (req, res) => {
  res.render("login/loginHelp.ejs");
};

export const postLoginHelp = (req, res) => {};

export const world = (req, res) => {
  res.render("worldmap/world.ejs");
};

export const asia_land = (req, res) => {
  res.render("worldmap/asia.ejs");
};

export const europe_land = (req, res) => {
  res.render("worldmap/europe.ejs");
};
