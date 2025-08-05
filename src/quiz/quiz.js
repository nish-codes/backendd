import express from 'express';
import User, { QuizResult } from '../model/model.js';

const router = express.Router();

// Route: POST /api/quiz/quiz
router.post('/submit', async (req, res) => {
  try {
    const {
      userId,
      answers,
      suggestedRoles,
      createdAt,
    
    } = req.body;

        // ✅ Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // ✅ Optional: check if profile already exists for this user
        const existingQuiz = await QuizResult.findOne({ userId });
        if (existingQuiz) {
          return res.status(400).json({ error: 'quiz already exists for this user' });
        }

    const newQuizResult = new QuizResult({
        userId,
        answers,
        suggestedRoles,
        createdAt,
 
    });

    await newQuizResult.save();

    res.status(201).json({
      message: 'QuizResult created successfully',
      Quizresult: newQuizResult
    });
  } catch (error) {
    console.error('Error submit QuizResult:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
