/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';


import ApiError from '../../errors/ApiError';
import { IGenericErrorMessage } from '../../interfaces/error';

// Import sqlite3

const globalErrorHandler: ErrorRequestHandler = (
  error:any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

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
  } else if (error instanceof ApiError) {
    // Custom API error handling
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    // General JavaScript/Node.js error
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // Respond with the error
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:  error?.stack
  });
};

export default globalErrorHandler;
