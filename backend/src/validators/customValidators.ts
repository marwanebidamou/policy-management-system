import mongoose from 'mongoose';
import { BaseError, BaseErrorType } from '../errors/BaseError';

export const validateAndCastObjectId = (id: string): mongoose.Types.ObjectId => {
    try {
        return mongoose.Types.ObjectId.createFromHexString(id); // Cast and validate
    } catch {
        throw new BaseError(`Invalid ObjectId: "${id}".`, BaseErrorType.NotFound);
    }
};