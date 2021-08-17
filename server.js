// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 5000;
// const mongoos = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const userRouter = require("./router/userRouter");
// const powershellRouter = require("./router/terminal");
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(userRouter);
// app.use(powershellRouter);

// app.listen(PORT, (req, res) => {
//   console.log("Server started on port ", PORT);
//   mongoos.connect(
//     "mongodb://localhost/mo-app",
//     {
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     },
//     (err) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log("Mongodb  connected");
//     }
//   );
// });
// var spawn = require("child_process").spawn,
//   child;
// child = spawn("powershell.exe", ["c:\\temp\\cmd.ps1"]);
// child.stdout.on("data", function (data) {
//   console.log("Powershell Data: " + data);
// });
// child.stderr.on("data", function (data) {
//   console.log("Powershell Errors: " + data);
// });
// child.on("exit", function () {
//   console.log("Powershell Script finished");
// });
// child.stdin.end();
 


var spawn = require("child_process").spawn,
  child;
child = spawn("powershell.exe", ["c:\\cmd\\cmd.ps1"]);
child.stdout.on("data", function (data) {
  console.log("Powershell Data: " + data);
});
child.stderr.on("data", function (data) {
  console.log("Powershell Errors: " + data);
});
child.on("exit", function () {
  console.log("Powershell Script finished");
});
child.stdin.end();
 