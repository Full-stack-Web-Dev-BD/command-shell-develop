const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoos = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./router/userRouter");
const powershellRouter = require("./router/terminal");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRouter);
app.use(powershellRouter);

app.listen(PORT, (req, res) => {
  console.log("Server started on port ", PORT);
  mongoos.connect(
    "mongodb://localhost/mo-app",
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Mongodb  connected");
    }
  );
});
