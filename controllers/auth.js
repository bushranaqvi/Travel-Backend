const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: user._id, name: user.fname }, "jwtSecret", {
    expiresIn: "900d",
  });
  res.status(StatusCodes.CREATED).json({ user: { name: user.fname }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("User not exist");
  }
  console.log(user.email);
  console.log(user.password);
  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.json({ user: { email: "not" } });
  } else {
    const token = jwt.sign(
      { userId: user._id, name: user.fname },
      "jwtSecret",
      {
        expiresIn: "900d",
      }
    );
    res
      .status(StatusCodes.OK)
      .json({ user: { email: user.email }, token, id: user._id });
  }
};
module.exports = {
  register,
  login,
};
