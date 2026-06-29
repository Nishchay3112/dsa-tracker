const express = require('express');
const router = express.Router();
const path = require('path');

const {
  signupUser,
  loginUser
} = require('../controllers/userController');

const {
  addProblem,
  getProblems,
  getStats,
  deleteProblem
} = require('../controllers/problemController');

const {
  addProfile , getProfiles
} = require('../controllers/profileController');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', loginUser);

router.post('/signup', signupUser);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send('logout success');
});

router.get('/signupsuccess', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'signupsuccess.html'));
});

// auth
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

// problems
router.post('/dashboard', authMiddleware, addProblem);
router.get('/problems', authMiddleware, getProblems);
router.get('/stats', authMiddleware, getStats);
router.get('/delete/:id', authMiddleware, deleteProblem);

// profile import
router.post('/import-profile', authMiddleware, addProfile);

router.get('/profiles',authMiddleware,getProfiles);

module.exports = router;