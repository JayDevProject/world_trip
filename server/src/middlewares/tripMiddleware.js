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

/** 검색 */
export const search = async (req, res, next) => {
  const { search } = req.query;

  if (search) {
    // 유저 닉네임 검색
    const user = await User.find({
      nickname: {
        $regex: new RegExp(search, "gi"),
      },
    });

    // 이미지 타이틀 검색
    const image = await Image.find({}).populate("user");
    const regex = new RegExp(search, "gi");

    let searchImage = [];

    image.forEach((img) => {
      img.file.filter((file) => {
        if (file.title.match(regex)) {
          let foundFile = {
            profileImg: img.user.profileImg,
            nickname: img.user.nickname,
            file,
          };

          searchImage.push(foundFile);
        }
      });
    });

    // 비디오 타이틀 검색
    return res.render("pug/album/search.pug", { user, searchImage });
  }

  next();
};
