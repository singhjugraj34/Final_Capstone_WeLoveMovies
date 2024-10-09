const reviewsService = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
// validation middleware
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);

  if (review) {
    res.locals.reviewId = reviewId;
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

const VALID_PROPERTIES = ['score', 'content'];
function hasOnlyValidProperties(req, _res, next) {
  const { data = {} } = req.body;
  console.log({ data });
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(', ')}`,
    });
  }
  next();
}
// route handlers
// DELETE /reviews/:reviewId
async function destroy(_req, res, _next) {
  const { reviewId } = res.locals;
  await reviewsService.delete(reviewId);
  res.sendStatus(204);
}
// UPDATE /reviews/:reviewId
async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const criticsInfo = await reviewsService.update(updatedReview);
  updatedReview.critic = criticsInfo;
  res.json({ data: updatedReview });
}

module.exports = {
  update: [
    asyncErrorBoundary(reviewExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
