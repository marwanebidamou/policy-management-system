import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;


const upVoteSchema = new Schema(
    {
        policyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Policy',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
    ,
    {
        versionKey: false,
    });

const UpVote = model('UpVote', upVoteSchema);

export default UpVote;