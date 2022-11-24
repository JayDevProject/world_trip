import User from "../../database/User.js";
import Image from "../../database/image.js";

export const continent = (req, res, next) => {
  const { url } = req;

  const island = [
    "asia",
    "europe",
    "africa",
    "oceania",
    "north-america",
    "south-america",
  ];

  const extension = ["p", "v", "lm"];

  const dismantle = url.split("/");

  if (island.includes(dismantle[1]) && extension.includes(dismantle[2])) {
    next();
  } else {
    res.render("pug/error/404.pug");
  }
};
