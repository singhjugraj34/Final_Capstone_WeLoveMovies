const theatersService = require('./theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
// GET /theaters
async function list(_req, res, _next) {
  const data = await theatersService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
