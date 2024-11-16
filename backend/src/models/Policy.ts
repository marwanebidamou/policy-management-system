import mongoose, { Schema, model, Document, Types } from 'mongoose';

// Define a separate interface for Policy
export interface IPolicy extends Document {
    title: string;
    description: string;
    academicYear: number;
    authorId: Types.ObjectId; // Reference to the User model
    upvotesCount: number;
    comments: Types.ObjectId[]; // Array of references to Comment documents
    tags: Types.ObjectId[]; // Array of references to Tag documents
    createdAt: Date;
    updatedAt: Date;
}

// Create the schema
const policySchema = new Schema<IPolicy>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
        },
        academicYear: {
            type: Number,
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
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
                type: Types.ObjectId,
                ref: 'Comment',
            },
        ],
        tags: [
            {
                type: Types.ObjectId,
                ref: 'Tag',
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Create the model
const Policy = model<IPolicy>('Policy', policySchema);

export default Policy;
