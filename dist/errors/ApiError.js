"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;
        // Capture the stack trace for better debugging
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
