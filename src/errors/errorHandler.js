// general error handler
function errorHandler(error, _req, res, _next) {
  // console.error(error); // Commented out to silence tests.
  const { status = 500, message = 'Something went wrong!' } = error;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
