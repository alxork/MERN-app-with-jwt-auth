const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

/*mongoose models come by default with methods like create, find, 
findONe, delte that we can use. We can also create our own methods.*/

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static singup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be field.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }
  if (!validator.isStrongPassword(password)) {
    // By default: 8 chars with low and upper case and special character.
    throw Error('Password not strong enough.');
  }

  const user = await this.findOne({ email });
  if (user) {
    throw Error('Email already in use.');
  }

  const saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);
  // !mongoose create new user in the database ↓ ↓ ↓
  const newUser = await this.create({ email, password: hashedPw });
  return newUser;
};

// static login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be field.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
