const express = require('express');
const router = express.Router();
const indexController = require('../controller/indexcontroller');
const User = require('../model/form');


// const apiPassword = '123456';

// Middleware to check the password
const authenticate = (req, res, next) => {
    const providedPassword = req.query.providedPassword;
  
    // Check if the provided password matches the expected password
    const expectedPassword = '123456'; // Change this to your actual expected password
    if (providedPassword === expectedPassword) {
      // Authentication successful, move to the next middleware or route handler
      next();
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

// Get all users
router.get('/user',authenticate, async (req, res) => {
    try {
        const users = await User.find();

        // Customize the response based on your user data structure
        const userArray = users.map(user => ({
            username: user.fname + ' ' + user.lname,
            email: user.email,
            password : user.password,
            gender : user.gender,
            contact : user.contact,
            address : user.address,
            state : user.state,
            role : user.role,
        }));

        res.json(userArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
