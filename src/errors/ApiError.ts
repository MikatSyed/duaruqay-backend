class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Capture the stack trace for better debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;