const router = require('express').Router();
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');
// GET /movies/:movieId/reviews
router
  .route('/:movieId/reviews')
  .get(controller.listReviewsByMovieId)
  .all(methodNotAllowed);

//GET /movies/:movieId/theaters
router
  .route('/:movieId/theaters')
  .get(controller.getTheatersShowingMovie)
  .all(methodNotAllowed);
//GET /movies/:movieId
router.route('/:movieId').get(controller.read).all(methodNotAllowed);
//GET /movies
router.route('/').get(controller.list).all(methodNotAllowed);

module.exports = router;
