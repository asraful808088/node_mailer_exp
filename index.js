require("dotenv").config();
const path = require("path");
const express = require("express");
const handlebars = require("nodemailer-express-handlebars");
const cors = require("cors");
const { sendMail } = require("./mail/mail");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
//optional
app.use(express.urlencoded({ extended: false }));
//
app.use(express.static(path.join(__dirname, "static")));
app.post("/", (req, res) => {
  console.log();
  sendMail({
    email: req.body.receEmail,
    sub: req.body.sub,
    yourName: req.body.name,
    receiverName: req.body.receName,
    message: req.body.message,
  })
    .then((result) => {
      res.status(200).json({
        name: "success",
      });
    })
    .catch((err) => {
      res.status(400).json({
        name: "failed",
      });
    });
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`server start on :${PORT} || http://localhost:${PORT}`);
  } else {
    console.log("server start failed");
  }
});
