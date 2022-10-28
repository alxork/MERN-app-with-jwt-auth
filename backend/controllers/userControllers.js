const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  // Create a token
  const jwtSecret = process.env.SECRET || 'put a string on the .env file'
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // this {_id}is the payload carried by the token.
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  // signup user -- una opción es poner la lógica para crear un user aquí en el controller.
  const { email, password } = req.body;
  /*try {
    const user = await User.create({ email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }*/
  // Pero otra opción, es ponerlo en un static method dentro del user Model.
  try {
    // !we call the static function created in the user model to create a new DB entry in mongodb
    const newUser = await User.signup(email, password);

    // Token here with the user id
    const token = createToken(newUser._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
