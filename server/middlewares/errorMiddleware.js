export const notFound = (req, res, next) => {
  const error = new Error(`path not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  // Jika status kode respon saat ini adalah 200 (servernya erorr tapi statusnya 200), kembalikan status kode respon 500
  const resStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Cek apakah error adalah validation error dari mongoose
  if (err.name === 'ValidationError') {
    const formattedErrors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = [err.errors[key].message];
      return acc;
    }, {});

    return res.status(400).json({
      code: '400',
      status: 'error',
      message: 'Validation error',
      errors: formattedErrors,
    });
  }

  // default error response
  res.status(resStatusCode).json({
    code: resStatusCode.toString(),
    status: 'error',
    message: message,
    stack: err.stack,
  });
};
