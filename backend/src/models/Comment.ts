import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const commentSchema = new mongoose.Schema(
    {
        policyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Policy',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
            maxlength: 500,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
