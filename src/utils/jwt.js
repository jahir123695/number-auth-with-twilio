const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'jahir695';
  return jwt.sign({ id: userId }, secret, { expiresIn: '30d' });
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || 'jahir695';
  return jwt.verify(token, secret);
};

module.exports = { createToken, verifyToken };
