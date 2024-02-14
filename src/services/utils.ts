const parseError = (error: any) => ({
  message: error.message,
  statusCode: error.statusCode,
  status: error.status,
  stackTrace: error.stack,
  data: error.data,
  isOperational: error.isOperational
});

export { parseError };
