const router = require("express").Router();
const PowerShell = require("powershell");

router.post("/command", (req, res) => {
  let ps = new PowerShell(req.body.command);
  let output = {};
  // Handle process errors (e.g. powershell not found)
  ps.on("error", (err) => {
    output = { ...output, error: err };
  });

  // Stdout
  ps.on("output", (data) => {
    output = { ...output, result: data };
    console.log("output", data);
  });

  // Stderr
  ps.on("error-output", (data) => {
    output = { ...output, error: data };
    console.error("error output", data);
  });

  // End
  ps.on("end", (code) => {
    console.log(code);
    res.json(output);
  });
});

router.get("/process", (req, res) => {
  let pathList = ["c:\\cmd\\cmd.ps1", "c:\\cmd\\cmd1.ps1", "c:\\cmd\\cmd2.ps1"];
  let path = "c:\\cmd\\cmd.ps1";
  let path1 = "c:\\cmd\\cmd1.ps1";
  let path2 = "c:\\cmd\\cmd2.ps1";
  pathList.map((el) => {
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [el]);
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
  });
  res.json({ message: `Command run from listed ps1 file` });
});
module.exports = router;
