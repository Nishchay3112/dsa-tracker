const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashpassword = await bcrypt.hash(password, 10);

  await userModel.create({
    username,
    email,
    password: hashpassword
  });

  res.status(200).send('successfully signup');
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(400).send('username or password is incorrect');
  }

  const passmatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passmatch) {
    return res.status(400).send('username or password is incorrect');
  }

  const token = jwt.sign(
    {
      userid : user._id,
      username : user.username
    },process.env.JWT_SECRET,
    {
      expiresIn:'1d'
    });

  res.cookie('token',token);

  res.status(200).json({
    username
  });
};

module.exports = {
  signupUser,
  loginUser
};