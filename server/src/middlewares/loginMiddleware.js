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
