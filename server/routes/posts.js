// Import necessary modules
const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
router.post('/', async (req, res) => {
  // Create a new post from the request body
  const newPost = await new Post(req.body);
  try {
    // Save the post to the database and return it
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
      // Return any errors that occur
      res.status(500).json(err);  
    }
});

// Update an existing post
router.put('/:id', async (req, res) => {
  try {
    // Find the post in the database
    const post = await Post.findById(req.params.id);
    // If the user is the owner of the post, update it
    if(post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('The post has been updated!');
    } else {
      // Otherwise, return an error
      res.status(403).json('You can only update your posts!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    // Find the post in the database
    const post = await Post.findById(req.params.id);
    // If the user is the owner of the post or is an admin, delete it
    if(post.userId === req.body.userId || req.body.isAdmin) {
      await post.deleteOne();
      res.status(200).json('The post has been deleted!');
    } else {
      // Otherwise, return an error
      res.status(403).json('You can only delete your posts!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like or unlike a post
router.put('/:id/like', async (req, res) => {
  try {
    // Find the post in the database
    const post = await Post.findById(req.params.id);
    // If the user hasn't liked the post, add their like
    if(!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('The post has been liked!');
    } else {
      // If the user has already liked the post, remove their like
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('The post has been disliked!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific post
router.get('/:id', async (req, res) => {
  try {
    // Find the post in the database
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts from a specific user
router.get('/profile/:username', async (req, res) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ username: req.params.username });
    // Find all posts from the user
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get timeline posts for a specific user
router.get('/timeline/:userId', async (req, res) => {
  try {
    // Find the current user in the database
    const currentUser = await User.findById(req.params.userId);
    // Find all posts from the current user
    const userPosts = await Post.find({ userId: currentUser._id });
    // Find all posts from each user that the current user is following
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      }
    )
  );
  // Concatenate the user's posts and their friends' posts and return them
  res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    // Return any errors that occur
    res.status(500).json(err);
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
