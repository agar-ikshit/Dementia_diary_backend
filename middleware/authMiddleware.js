const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Invalid token');
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; 

    console.log('Token:', token);
    console.log('Decoded User:', decoded); 
    next();
  });
};

module.exports = verifyToken;
