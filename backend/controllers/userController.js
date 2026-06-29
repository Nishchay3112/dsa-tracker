const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGNUP
const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      email,
      password: hashpassword
    });

    res.status(200).json({ message: 'signup success' });

  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'invalid credentials' });
    }

    const passmatch = await bcrypt.compare(password, user.password);

    if (!passmatch) {
      return res.status(400).json({ message: 'invalid credentials' });
    }

    const token = jwt.sign(
      {
        userid: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    res.status(200).json({
      username: user.username,
      message: 'login success'
    });

  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
};

module.exports = {
  signupUser,
  loginUser
};