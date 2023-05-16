// Import necessary modules
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Define a new route for user signup
router.post('/signup', async (req, res) => {
  try {
    // Generate a new salt for password hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the received password using the generated salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create a new user instance with the received username and email, and hashed password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to the database and send the user object as a response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
      // Log any error that occurs and send the error as a response
      console.log(err);
      res.status(500).json(err);
    }
});

// Define a new route for user login
router.post('/login', async (req, res) => {
  try {
    // Try to find a user with the received email
    const user = await User.findOne({ email: req.body.email });
    // If no such user exists, send a 404 error
    if (!user) {
      return res.status(404).json('user not found');
    } 

    // Check if the received password matches the user's password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    // If the passwords don't match, send a 400 error
    if (!validPassword) {
      return res.status(400).json('wrong password');
    };

    // If everything is okay, send the user object as a response
    return res.status(200).json(user);

  } catch (err) {
      // Log any error that occurs and send the error as a response
      return res.status(500).json(err);
    }
});
  
// Export the router to be used in other files
module.exports = router;
