const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const DuplicateError = require('../errors/DuplicateError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = ((req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.send({
          _id: user._id,
          name,
          email,
        });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new DuplicateError('переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
});

const updateProfile = (req, res, next) => {
  const userById = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userById, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданны некорректные данные пользователя при обновлении профиля'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getInfoCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('пользователь не найден'));
      }
      const { email, name } = user;
      return res.send({ email, name });
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getInfoCurrentUser,
};
