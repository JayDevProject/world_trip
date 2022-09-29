export const continent = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const island = [
    "asia",
    "europe",
    "africa",
    "oceania",
    "north-america",
    "south-america",
  ];

  if (island.includes(id)) {
    next();
  } else {
    res.render("pug/error/404.pug");
  }
};
