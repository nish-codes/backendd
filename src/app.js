import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/index.js';
import authRoutes from './auth/auth.js'; // ✅ Import route

dotenv.config();

const app = express();
app.use(express.json());

// Connect to DB
connectDb();

// Use the auth route
app.use('/api/auth', authRoutes); // ✅ Now /api/auth/google-signin works

// Default route
app.get('/', (req, res) => res.send('API is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
