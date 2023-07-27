const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const {
  login,
  createUser
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  loginValidation,
  createUserValidation
} = require('../middlewares/validationRoutes');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => next(new NotFoundError('упс...такой странички не существует)))')));

module.exports = router;
