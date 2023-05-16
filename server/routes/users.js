// Import necessary modules and models
const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Endpoint to get a user
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    // Find the user by userId or by username
    const user = userId 
    ? await User.findById(userId) 
    : await User.findOne({ username: username });
    // Exclude password, updatedAt, and isAdmin fields from the response
    const { password, updatedAt, isAdmin, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
      return res.status(500).json(err);
    };
});

// Endpoint to update a user
router.put('/:id', async (req, res) => {
  // Only allow updating if the logged in user is the same as the user to update or if the logged in user is an admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // If a new password is provided, hash it before saving
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
          return res.status(500).json(err);
        }
    }
    try {
      // Update the user in the database
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
        return res.status(500).json(err);
      }
  } else {
    res.status(403).json('You can update only your account!');
  }
});

// Endpoint to delete a user
router.delete('/:id', async (req, res) => {
  // Only allow deleting if the logged in user is the same as the user to delete or if the logged in user is an admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // Delete the user from the database
      const user = await User.deleteOne({ _id: req.params.id });
      res.status(200).json('Account has been deleted');
    } catch (err) {
        return res.status(500).json(err);
      }
  } else {
    res.status(403).json('You can only delete your own account!');
  }
});

// Endpoint to get a user's friends
router.get('/friends/:userId', async (req, res) => {
  try {
    // Get the user from the database
    const user = await User.findById(req.params.userId);
    // Map over the user's following array and return a new array of promises to get each followed user's data
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    // Map over the friends array and create a new array of friend data
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
      return res.status(500).json(err);
    }
});

// Endpoint to follow a user
router.put('/:id/follow', async (req, res) => {
  // Prevent users from following themselves
  if (req.body.userId !== req.params.id) {

    try {
      // Get the user to be followed and the current user from the database
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // Check if the current user already follows the user to be followed
      if(!user.followers.includes(req.body.userId)) {
        // If not, add the current user to the followers of the user to be followed
        await user.updateOne({ $push: { followers: req.body.userId } });
        // And add the user to be followed to the following of the current user
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json('User has been followed');
      } else {
        res.status(403).json('You already follow this user');
      }
    } catch (err) {
        return res.status(500).json(err);
      }
      
  } else {
    res.status(403).json("You can't follow yourself!");
  }
});

// Endpoint to unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  // Prevent users from unfollowing themselves
  if (req.body.userId !== req.params.id) {

    try {
      // Get the user to be unfollowed and the current user from the database
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // Check if the current user follows the user to be unfollowed
      if(user.followers.includes(req.body.userId)) {
        // If yes, remove the current user from the followers of the user to be unfollowed
        await user.updateOne({ $pull: { followers: req.body.userId } });
        // And remove the user to be unfollowed from the following of the current user
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json('User has been unfollowed');
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
        return res.status(500).json(err);
      }

  } else {
    res.status(403).json("You can't follow yourself!");
  }
});
// Export the router to be used in other parts of the application
module.exports = router;
