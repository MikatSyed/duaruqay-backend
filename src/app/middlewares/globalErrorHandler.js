


import ApiError from '../../errors/ApiError.js';




const globalErrorHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages= [];

  if (error instanceof Error && error.name === 'SQLITE_ERROR') {
   
    statusCode = 400; 
    message = `SQLite error: ${error.message}`;
    errorMessages = [
      {
        path: '',
        message: `SQLite error: ${error.message}`,
      },
    ];
  } else if (error instanceof ApiError) {
   
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

 
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:  error?.stack
  });
};

export default globalErrorHandler;
