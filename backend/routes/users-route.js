const express = require('express');
const auth = require('./middleware/auth.js');

// User model:
const User = require('./models/user.js');

const router = new express.Router();

// Create User:
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      token,
      message: 'New account created!',
    });
  } catch (error) {
    console.log(error);
    if (user.password.length < 8) {
      res.status(500).send({
        message: 'Password needs to be more than 8 characters!',
      });
    } else if (error.keyPattern.username === 1) {
      res.status(500).send({
        message: 'Username already taken!',
      });
    } else {
      res.status(500).send({
        message: 'Something went wrong!',
      });
    }
  }
});

// User login:
router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Unable to login!',
    });
  }
});

// User logout:
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({
      message: 'Logged Out',
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// View a user details:
router.get('/users/:username', auth, async (req, res) => {
  res.send(req.user);
});

// Delete user:
router.delete('/users/delete', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send({
      message: 'Your account was deleted!',
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
