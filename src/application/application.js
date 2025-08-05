import express from 'express';
import User, { Application } from '../model/model.js'; // Adjust path if needed

const router = express.Router();

// Route: POST /api/profile/create
router.post('/application', async (req, res) => {
  try {
    const {
      userId,
      internshipId,
      resumeId,
      status,
      matchScore,
     
    } = req.body;

      // ✅ Check if user exists
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

    const newApplication = new Application({
        userId,
        internshipId,
        resumeId,
        status,
        matchScore,
    });

    await newApplication.save();

    res.status(201).json({
      message: 'Application created successfully',
      profile: newApplication
    });
  } catch (error) {
    console.error('Error creating Application:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
