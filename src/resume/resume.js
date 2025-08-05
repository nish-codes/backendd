import express from 'express';
import User, { Resume } from '../model/model.js'; // ✅ import User if default export

const router = express.Router();

// Route: POST /api/profile/SubmitResume
router.post('/SubmitResume', async (req, res) => {
  try {
    const {
      userId,
      education,
      projects,
      experience,
      skills,
      achievements,
      certifications,
      optimizedKeywords,
      lastUpdated
    } = req.body;

    // ✅ Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newResume = new Resume({
      userId, // ✅ Use the ID, not user object
      education,
      projects,
      experience,
      skills,
      achievements,
      certifications,
      optimizedKeywords,
      lastUpdated
    });

    await newResume.save();

    res.status(201).json({
      message: 'Resume created successfully',
      ResumeResult: newResume
    });
  } catch (error) {
    console.error('Error creating Resume:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
