export class BaseError extends Error {
    public type: BaseErrorType;
    public details?: any;

    constructor(message: string, type: BaseErrorType, details?: any) {
        super(message);
        this.type = type;
        this.details = details;
    }
}

export enum BaseErrorType {
    NotFound = 404,
    DeleteUsedItem = 423,
    InvalidModel = 400
}