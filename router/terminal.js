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
module.exports = router;
