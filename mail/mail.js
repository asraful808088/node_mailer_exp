require("dotenv").config();
const nodemail = require("nodemailer");
const path = require("path");
const handlebars = require("nodemailer-express-handlebars");
let transporter = nodemail.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.use(
  "compile",
  handlebars({
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.resolve("./mail/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./mail/views"),
    extName: ".handlebars",
  })
);
async function sendMail({ email, sub, yourName, receiverName, message }) {
  let info = await transporter.sendMail({
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: sub,
    context: {
      sub: sub,
      receiverName,
      yourName,
      message,
    },
    attachments: [
      {
        filename: "header.png",
        path: __dirname + "/views/image/header.png",
        cid: "header",
      },
    ],
    template: "index",
  });

  return {
    user_info: info.messageId,
    mail_info: nodemail.getTestMessageUrl(info),
  };
}

module.exports = {
  sendMail,
};
