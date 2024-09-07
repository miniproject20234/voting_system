const jwt = require('jsonwebtoken');
const regUsers = require('../model/regUser');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log('Token verification error:', err.message);
        return res.status(401).json({ message: 'Please log in to access this page.' });
      }  else {
        console.log('Decoded Token:', decodedToken);
       
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Please log in to access this page.' });
  }
};

module.exports = { requireAuth };

