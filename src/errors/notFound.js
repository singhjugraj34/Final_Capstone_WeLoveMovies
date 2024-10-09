// handler for non existent routes
function notFound(req, _res, next) {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
