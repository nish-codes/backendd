import express from 'express';
import User, { Mentor } from '../model/model.js';

const router = express.Router();

// Route: POST /api/quiz/quiz
router.post('/mentor', async (req, res) => {
    try {
        const {
            userId,
            bio,
            expertise,
            availableSlots,
        } = req.body;

        // ✅ Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }


        const newMentor = new Mentor({
            userId,
            bio,
            expertise,
            availableSlots,
        });

        await newMentor.save();

        res.status(201).json({
            message: 'newMentor created successfully',
            Quizresult: newMentor
        });
    } catch (error) {
        console.error('Error submit newMentor:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
