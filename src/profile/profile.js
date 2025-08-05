import express from 'express';
import mongoose from 'mongoose';
import User, { UserProfile } from '../model/model.js';


const router = express.Router();

// Route: POST /api/profile/create
router.post('/create', async (req, res) => {
  try {
    const {
      userId,
      college,
      degree,
      year,
      linkedin,
      github,
      skills,
      interests
    } = req.body;

    // ✅ Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Optional: check if profile already exists for this user
    const existingProfile = await UserProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists for this user' });
    }

    const newProfile = new UserProfile({
      userId,
      college,
      degree,
      year,
      linkedin,
      github,
      skills,
      interests
    });

    await newProfile.save();

    res.status(201).json({
      message: 'Profile created successfully',
      profile: newProfile
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
