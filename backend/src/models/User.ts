import mongoose from 'mongoose';
import { hashPassword } from '../utils/passwordUtil';

const { Schema, model, Types } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 10,
        },
        createdPolicies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Policy',
            },
        ],
        upvotedPolicies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Policy',
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        timestamps: true, // for automatic createdAt and updatedAt fields
    }
);

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

// Create the Policy user
const User = model('User', userSchema);

export default User;
