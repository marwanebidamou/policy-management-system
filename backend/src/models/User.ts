import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model, Types } = mongoose;

const SALT_ROUNDS = 10;


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
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
    next();
});

// Compare plain text password with hashed password
userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

// Create the Policy user
const User = model('User', userSchema);

export default User;
