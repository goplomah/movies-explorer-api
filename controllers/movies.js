const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.send(movies))
  // Movie.find({ owner: req.user._id })
  //   // .populate(['owner', 'req.user._id'])
  //   .then((movies) => { res.send(movies); })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      movie
        .populate('owner')
        .then(() => res.status(201).send(movie));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const movieById = req.params._id;
  const userById = req.user._id;
  Movie.findById(movieById)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('карточка с указанным id не найдена'));
      }
      if (movie.owner.toString() !== userById) {
        return next(new ForbiddenError('У вас нет прав на удаление чужой карточки'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ data: movie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('передан несуществующий _id карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
