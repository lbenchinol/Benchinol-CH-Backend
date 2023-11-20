import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    password: { type: String },
    role: { type: String, default: 'user' },
    provider: { type: String, default: 'Local' }

}, { timestamps: true });

export default mongoose.model('users', userSchema);