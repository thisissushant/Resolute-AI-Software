const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const port = 3000;
const userModel = require("./modals/user.model");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/usercurd");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          res.json("Success");
        } else {
          res.json("User not found");
        }
      });
    } else {
      res.json("Not found");
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      userModel
        .create({ name, email, password: hash })
        .then((users) => res.json(users))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => alert(err.message));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
