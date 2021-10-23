const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("hello world!!!!"));
app.listen(port, () => console.log(`Example app listening on port ${port}`));

const { User } = require("./models/Users");

app.post("/register", (req, res) => {
  // 회원 가입 시 필요한 정보를 client에서 가져와서 데이터베이스에 입력
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 검색
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
  });
  //비밀번호가 맞는지 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    //토큰 생성
    user.generateToken((err) => {});
  });
});
