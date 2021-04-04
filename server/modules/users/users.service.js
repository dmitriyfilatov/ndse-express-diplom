const { User } = require('./users.model');
const bcrypt = require('bcryptjs');
// const passport = require('passport')

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

class UsersService {
  constructor() {}

  async create(userData) {
    const { email, password, name, contactPhone } = userData;
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
        return { status: 'error', message: `user with email ${email} exist` };
      }

      return { status: 'error', message: 'something went wrong' };
    }

    newUser.passwordHash = undefined;
    return { data: newUser, status: 'ok' };
  }

  async getByEmail(email) {
    const user = await User.findOne({ email });
    user.passwordHash = undefined;
    return { status: 'ok', data: user };
  }
}

module.exports = { UsersService };
