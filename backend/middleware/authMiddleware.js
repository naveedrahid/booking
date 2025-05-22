const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// const protect = async (req, res, next) => {
//     let token;
  
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       try {
//         token = req.headers.authorization.split(' ')[1];
  
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
//         const user = await User.findById(decoded.id);
  
//         if (!user) {
//           return res.status(401).json({ message: 'User not found' });
//         }
  
//         req.user = user;
//         next();
//       } catch (error) {
//         console.error('Auth error:', error.message);
//         return res.status(401).json({ message: 'Not authorized' });
//       }
//     } else {
//       return res.status(401).json({ message: 'No token provided' });
//     }
//   };
const protect = async (req, res, next) => {
    let token;

    // Token cookie se le rahe hain
    token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        return res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = protect;