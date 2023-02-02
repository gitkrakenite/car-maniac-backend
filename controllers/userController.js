const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// DESC     register a user
// METHOD   POST /api/v1/user/register
// ACCESS   public
const registerUser = async (req, res) => {
  const { name, email, national, password } = req.body;
  if (!name || !email || !national || !password) {
    res.status(400).send("All fields required");
    return;
  }

  // check if user exists already
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists");
    return;
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //  create user
  const user = await User.create({
    name,
    email,
    national,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).send(user);
  } else {
    res.status(400).send("failed to create user");
  }
};

// DESC     login a user
// METHOD   POST /api/v1/user/login
// ACCESS   public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    res.status(400).json({ message: "Data missing" });
    return;
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(user);
  } else {
    res.status(400).send("Invalid credentials");
  }
};

module.exports = { registerUser, loginUser };
