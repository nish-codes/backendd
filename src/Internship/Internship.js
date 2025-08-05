import express from 'express';
import User, { Internship } from '../model/model.js';

const router = express.Router();

router.post('/submitinternship', async (req, res) => {
  try {
    const {
      recruiterId,
      company,
      title,
      description,
      requiredSkills,
      stipend,
      location,
      deadline
    } = req.body;

    // ✅ Check if recruiter exists
    const recruiterIdExist = await User.findById(recruiterId);
    if (!recruiterIdExist) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }

    const newInternship = new Internship({
      recruiterId,
      company,
      title,
      description,
      requiredSkills,
      stipend,
      location,
      deadline
    });

    await newInternship.save();

    res.status(201).json({
      message: 'Internship created successfully',
      profile: newInternship
    });
  } catch (error) {
    console.error('Error creating Internship:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
