import "express-session";
import nodemailer from "nodemailer";

/** 로그인 정보 조회 */
export const login_inspect = (req, res, next) => {
  const {
    session: { userId },
  } = req;

  if (userId) {
    next();
  } else {
    req.session.url = req.originalUrl;
    return res.redirect("/");
  }
};

/** 이메일 인증 */
export const email = (req, res, next) => {
  // 이메일 입력 값
  const { emailVertify } = req.body;

  // 이메일을 입력했을 시 동작. 입력하지 않을 경우 에러
  if (emailVertify) {
    // 6자리의 난수 생성
    let randomNum = Math.floor(100000 + Math.random() * 900000);
    req.session.emailCode = randomNum;

    // 메일 발송 메서드. 사용할 메일과 아이디 및 비밀번호
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // from(본인) to(누구에게) 설정 및 메일 내용.
    let mailOption = {
      from: process.env.GMAIL,
      to: emailVertify,
      subject: "[trip] 인증 관련 이메일입니다.",
      text: `6자리 숫자 ${randomNum} 을 입력해주세요.`,
    };

    // 메일 발송
    transport.sendMail(mailOption, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log(response);
    });
  }

  next();
};
