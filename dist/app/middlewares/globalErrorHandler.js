"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
// Import sqlite3
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages = [];
    // Handling sqlite3 errors
    if (error instanceof Error && error.name === 'SQLITE_ERROR') {
        // General SQLite error handling
        statusCode = 400; // Bad Request
        message = `SQLite error: ${error.message}`;
        errorMessages = [
            {
                path: '',
                message: `SQLite error: ${error.message}`,
            },
        ];
    }
    else if (error instanceof ApiError_1.default) {
        // Custom API error handling
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        // General JavaScript/Node.js error
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    // Respond with the error
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: error === null || error === void 0 ? void 0 : error.stack
    });
};
exports.default = globalErrorHandler;
