const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify authentication. In the headers we can access to certain info, not only to 'Content-Type'
  const { authorization } = req.headers; // should contain our jwt.
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  //   'Bearer ofidsofisd.dsfdsf.sdfdsfsfd'
  //   Split the string into its parts: bearer - token string.

  console.log(authorization);
  const token = authorization.split(' ')[1];
  // 'Bearer ijodsijgod45546o4i5gfdgfodgj553' <-- we want the second part
  //   verify the token using jwt package

  try {
    const jwtSecret = process.env.SECRET || 'put a string on the .env file';
    const { _id } = jwt.verify(token, process.env.SECRET);
    /*Check if the given _id corresponds to a stored user in the DB, 
    find it and attach the _id value to the req object under a new property: user.*/
    req.user = await User.findOne({ _id }).select('_id');
    // select method slims down the document to only return the _id.
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized.' });
  }
};

module.exports = requireAuth;
