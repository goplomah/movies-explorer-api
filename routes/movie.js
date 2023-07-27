const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
  // likeCard,
  // dislikeCard,
} = require('../controllers/movies');
const {
  createMovieValidation,
  deleteMovieValidation,
  // likeCardValidation,
  // dislikeCardValidation,
} = require('../middlewares/validationRoutes');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:_id', deleteMovieValidation, deleteMovie);
// router.put('/:_id/likes', likeCardValidation, likeCard);
// router.delete('/:_id/likes', dislikeCardValidation, dislikeCard);

module.exports = router;
