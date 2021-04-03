const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fileMiddleware = require('./../middleware/file');
const User = require('./../models/User');

router.post('/create', fileMiddleware.single('file'), async (req, res) => {
  const { email, password, name, contactPhone } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    passwordHash,
    name,
    contactPhone,
  });

  try {
    await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: `user with email ${email} exist` });
      return;
    }

    res.status(400).json({ error: 'something went wrong' });
    return;
  }

  res.status(201).json(newUser);
});

router.get(
  '/get-by-email/:email',
  fileMiddleware.single('file'),
  async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ email });
    user.passwordHash = undefined;
    res.status(200).json(user);
  },
);

module.exports = router;
