const knex = require('../db/connection');
// GET /movies
function list() {
  return knex('movies').select('*');
}
//GET /movies?is_showing=true
function getMoviesShowing() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('*')
    .where('mt.is_showing', true)
    .groupBy('m.movie_id');
}
//GET /movies/:movieId
function read(movie_id) {
  return knex('movies').select('*').where({ movie_id }).first();
}
//GET /movies/:movieId/theaters
function getTheatersShowingMovie(movie_id) {
  return knex('movies_theaters as mt')
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('*')
    .where({ movie_id, is_showing: true });
}
// GET /movies/:movieId/reviews
function listReviewsByMovieId(movie_id) {
  return knex('reviews')
    .select('*')
    .where({ movie_id })
    .then((movieReviews) => {
      const mappedReviews = movieReviews.map((review) => {
        return knex('critics')
          .select('*')
          .where({ critic_id: review.critic_id })
          .first()
          .then((firstCritic) => {
            review.critic = firstCritic;
            return review;
          });
      });
      const fulfilledReviewsWithCritics = Promise.all(mappedReviews);
      return fulfilledReviewsWithCritics;
    });
}

module.exports = {
  read,
  list,
  getMoviesShowing,
  getTheatersShowingMovie,
  listReviewsByMovieId,
};
