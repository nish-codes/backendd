import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/index.js';
import authRoutes from './auth/auth.js';
import profileRoutes from './profile/profile.js'; // ✅ Add this
import quizRoutes from './quiz/quiz.js'; // ✅ Add this
import resumeRoutes from './resume/resume.js'; // ✅ Add this
import InternshipRoutes from './Internship/Internship.js'; // ✅ Add this
import ApplicationRoutes from './application/application.js'; // ✅ Add this
import HackathonRoutes from './Hackathon/Hackathon.js'; // ✅ Add this
import PostRoutes from './Post/post.js'; // ✅ Add this
import MentorRoutes from './Mentor/mentor.js'; // ✅ Add this

dotenv.config();

const app = express();
app.use(express.json());

// Connect DB
connectDb();

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // ✅ Now accessible via /api/profile/create
app.use('/api/quiz', quizRoutes); 
app.use('/api/resume', resumeRoutes); 
app.use('/api/internship', InternshipRoutes); 
app.use('/api/application', ApplicationRoutes); 
app.use('/api/hackathon', HackathonRoutes); 
app.use('/api/post', PostRoutes); 
app.use('/api/mentor', MentorRoutes); 

// Test route
app.get('/', (req, res) => res.send('API is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
