const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://subin:rmeodu11!!@cluster0.dc6i5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(`error!!! ${err}`));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
