import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 50,
        },
        policies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Policy',
            },
        ],
    }
);

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
