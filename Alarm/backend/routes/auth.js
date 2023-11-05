const router = require('express').Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).send('Username not found');
  }
  return res.status(200).send({
    message: 'User successfully logged in',
    user
  });
})

router.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).send({
      message: 'User successfully registered',
      user: newUser
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
})


module.exports = router;
