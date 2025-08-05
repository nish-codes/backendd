import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/model.js';

const router = express.Router();
const JWT_SECRET = 'your_secret_key'; // Use environment variable in real apps

// ✅ Add GET for testing in browser
router.get('/google-signin', (req, res) => {
    res.send('Google Sign-In API is working'); // ✅ Plain text response
});

router.post('/google-signin', async (req, res) => {
    try {
        const { name, email, profilePic,role } = req.body;

        if (!email) {
            return res.status(400).send('Email is required');
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                profilePic,
                authProvider: 'google',
                role
            });
            await user.save();
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // ✅ Keep JSON response for POST
        res.json({
            message: 'User signed in successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
