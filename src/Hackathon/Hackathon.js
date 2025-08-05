import express from 'express';
import User, { Hackathon } from '../model/model.js';

const router = express.Router();

router.post('/hackathon', async (req, res) => {
  try {
    const {
        name,
        organizer,
        domains,
        registrationDeadline,
        eventDate,
        prize,
        resources,
  
    } = req.body;

    // ✅ Check if recruiter exists
    // const recruiterIdExist = await User.findById(recruiterId);
    // if (!recruiterIdExist) {
    //   return res.status(404).json({ error: 'Recruiter not found' });
    // }

    const newHackathon = new Hackathon({
        name,
        organizer,
        domains,
        registrationDeadline,
        eventDate,
        prize,
        resources,
    });

    await newHackathon.save();

    res.status(201).json({
      message: 'newHackathon created successfully',
      profile: newHackathon
    });
  } catch (error) {
    console.error('Error creating newHackathon:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
