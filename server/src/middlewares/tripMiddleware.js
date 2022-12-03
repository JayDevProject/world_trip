import User from "../../database/User.js";
import Image from "../../database/image.js";
import Video from "../../database/video.js";

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

/** 좋아요 버튼 클릭 */
export const like = async (req, res, next) => {
  const {
    session: { userId },
    body: { like },
    params: { id },
    url,
  } = req;
  const ownedPostUser = url.split("/")[1];

  // 좋아요 클릭 시 유저 좋아요 데이터베이스에 정보 반영
  const user = await User.findById(userId);
  // 게시물 소유자의 ObjectId
  const { _id } = await User.findOne({ nickname: ownedPostUser });

  // 좋아요 버튼을 눌렀을 경우
  if (like) {
    try {
      const image = await Image.findOne({ user: _id });
      const file = image.file.find((i) => i.fileId === id);
      file.like += 1;

      // user 데이터베이스에 좋아요 게시물 추가
      user.like.unshift({ fileId: id });
      user.save();
      image.save();

      return res.json(file.like);
    } catch {
      const video = await Video.findOne({ user: _id });
      const file = video.file.find((i) => i.fileId === id);
      file.like += 1;

      // user 데이터베이스에 좋아요 게시물 추가
      user.like.unshift({ fileId: id });
      user.save();
      video.save();

      return res.json(file.like);
    }
  }

  // 좋아요 버튼을 해제 할 경우
  // 댓글 입력 시 like 가 undefined 가 뜨기 때문에 false 조건을 적용
  if (like === false) {
    try {
      const image = await Image.findOne({ user: _id });
      const file = image.file.find((i) => i.fileId === id);
      file.like -= 1;

      // user 데이터베이스에 좋아요 게시물 제거
      user.like = user.like.filter((i) => i.fileId !== id);
      user.save();
      image.save();

      return res.json(file.like);
    } catch {
      const video = await Video.findOne({ user: _id });
      const file = video.file.find((i) => i.fileId === id);
      file.like -= 1;

      // user 데이터베이스에 좋아요 게시물 제거
      user.like = user.like.filter((i) => i.fileId !== id);
      user.save();
      video.save();

      return res.json(file.like);
    }
  }

  next();
};
