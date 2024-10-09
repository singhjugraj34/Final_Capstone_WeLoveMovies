if (process.env.USER) require('dotenv').config();
const express = require('express');
const cors = require('cors');

const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');
// initialize express app
const app = express();
// allow express to use cors
app.use(cors());
// allow express app to parse json on req.body
app.use(express.json());
// routes
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);
// not found path error handler
app.use(notFound);
// general error handler
app.use(errorHandler);

module.exports = app;
