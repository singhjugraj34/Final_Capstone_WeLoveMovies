const knex = require('../db/connection');
// For validation
function read(reviewId) {
  return knex('reviews').select('*').where({ review_id: reviewId }).first();
}
// DELETE /reviews/:reviewId
function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}
// UPDATE /reviews/:reviewId
function update(review) {
  return knex('reviews')
    .where({ review_id: review.review_id })
    .update(review, '*')
    .then(() => {
      return knex('critics')
        .select('*')
        .where({ critic_id: review.critic_id })
        .first();
    });
}

module.exports = {
  read,
  update,
  delete: destroy,
};
