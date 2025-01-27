const jwt = require('jsonwebtoken');
const { ValidationError } = require('sequelize');

// Middleware to verify the token
function verifyToken(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation Errors:');
        error.errors.forEach((err) => {
          console.error(`${err.path}: ${err.message}`);
        });
      } else {
        console.error('Error: while', error);
      }
    return res.status(403).json({ message: 'Invalid or expired token', error: error.message });
  }
}

module.exports = verifyToken;
