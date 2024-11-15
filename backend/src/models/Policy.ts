import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const policySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true
        },
        authorId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        upvotesCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ]
    },
    {
        timestamps: true, // for automatic createdAt and updatedAt fields
    }
);

// Create the Policy model
const Policy = model('Policy', policySchema);

export default Policy;
