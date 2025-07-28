import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
    authProvider: { type: String, default: 'google' }
});

const User = mongoose.model('User', userSchema);
export default User;
