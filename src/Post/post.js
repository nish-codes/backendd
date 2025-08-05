import express from 'express';
import User, { Post } from '../model/model.js';

const router = express.Router();

// Route: POST /api/quiz/quiz
router.post('/upload', async (req, res) => {
  try {
    const {
      userId,
      content,
      image,
      tags,
      type,
      likes
    
    } = req.body;

        // ✅ Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
          return res.status(404).json({ error: 'User not found' });
        }
    
     
    const newPost = new Post({
      userId,
      content,
      image,
      tags,
      type,
      likes
    });

    await newPost.save();

    res.status(201).json({
      message: 'newPost created successfully',
      Quizresult: newPost
    });
  } catch (error) {
    console.error('Error submit newPost:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
