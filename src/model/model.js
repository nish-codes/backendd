// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String },
  authProvider: { type: String, default: 'google' },
  role: { type: String, enum: ['student', 'recruiter'], required: true },
});

const User = mongoose.model('User', userSchema);
export default User;

// models/UserProfile.js
const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  college: String,
  degree: String,
  year: String,
  linkedin: String,
  github: String,
  skills: [String],
  interests: [String],
});

export const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// models/QuizResult.js
const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [String],
  suggestedRoles: [String],
  createdAt: { type: Date, default: Date.now },
});

export const QuizResult = mongoose.model('QuizResult', quizResultSchema);

// models/Resume.js
const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  education: [{ institution: String, degree: String, year: String }],
  projects: [{ title: String, description: String, link: String }],
  experience: [{ company: String, role: String, duration: String, description: String }],
  skills: [String],
  achievements: [String],
  certifications: [String],
  optimizedKeywords: [String],
  lastUpdated: { type: Date, default: Date.now },
});

export const Resume = mongoose.model('Resume', resumeSchema);

// models/Internship.js
const internshipSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  company: String,
  title: String,
  description: String,
  requiredSkills: [String],
  stipend: String,
  location: String,
  deadline: Date,
});

export const Internship = mongoose.model('Internship', internshipSchema);

// models/Application.js
const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  status: { type: String, enum: ['applied', 'reviewing', 'interview', 'rejected', 'accepted'], default: 'applied' },
  matchScore: Number,
});

export const Application = mongoose.model('Application', applicationSchema);

// models/Hackathon.js
const hackathonSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  domains: [String],
  registrationDeadline: Date,
  eventDate: Date,
  prize: String,
  resources: [String],
});

export const Hackathon = mongoose.model('Hackathon', hackathonSchema);

const hackathonTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' },
  joined: Boolean,
  teamStatus: String,
  milestones: [String],
  submissionLink: String,
  certificateLink: String,
});

export const HackathonTracker = mongoose.model('HackathonTracker', hackathonTrackerSchema);

// models/Roadmap.js
const roadmapSchema = new mongoose.Schema({
  role: String,
  subjects: [String],
  platforms: [String],
  recommendedProjects: [String],
  interviewPrep: [String],
  certifications: [String],
});

export const Roadmap = mongoose.model('Roadmap', roadmapSchema);

// models/Post.js
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  image: String,
  tags: [String],
  type: { type: String, enum: ['win', 'tip', 'project', 'challenge'] },
  likes: [mongoose.Schema.Types.ObjectId],
});

export const Post = mongoose.model('Post', postSchema);

// models/Mentor.js
const mentorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bio: String,
  expertise: [String],
  availableSlots: [Date],
});

export const Mentor = mongoose.model('Mentor', mentorSchema);

const bookingSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slot: Date,
  status: { type: String, enum: ['booked', 'completed', 'cancelled'] },
});

export const Booking = mongoose.model('Booking', bookingSchema);

// models/Portfolio.js
const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projects: [{ title: String, link: String, tags: [String], description: String }],
});

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// models/Message.js
const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  sentAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);

// models/Notification.js
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  type: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = mongoose.model('Notification', notificationSchema);

// models/Achievement.js
const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  badge: String,
  description: String,
  awardedAt: Date,
});

export const Achievement = mongoose.model('Achievement', achievementSchema);

// models/Referral.js
const referralSchema = new mongoose.Schema({
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referredEmail: String,
  rewardClaimed: Boolean,
});

export const Referral = mongoose.model('Referral', referralSchema);
