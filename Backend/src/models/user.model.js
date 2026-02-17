import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]},
    password: {type: String, required: true, minLength: 8, select: false},
    role: {type: String, enum: ['user', 'admin'], default: 'user'}, 
    
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;