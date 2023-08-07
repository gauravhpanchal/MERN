const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = Router();

userController.post("/signup", (req, res) => {
  const { email, password, age } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send("Something went wriong");
    }
    const user = new UserModel({
      email,
      password: hash,
      age,
    });
    await user.save();
    res.send("Signup Successful");
  });
});
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  if (!user) {
    res.send("Signup first");
  } else {
    bcrypt.compare(password, hash, function (err, result) {
      // result == true
      if (err) {
        res.send("Something went wrong");
      }
      if (result) {
        const token = jwt.sign({ userId: user._id }, "grv");
        res.send({ messsage: "Login successful", token });
      } else {
        res.send("Invalid credentials");
      }
    });
  }
});

module.exports = { userController };
