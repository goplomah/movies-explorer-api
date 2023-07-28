const { Joi, celebrate } = require('celebrate');
const regexUrl = require('../utils/regex');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(100).required(),
    director: Joi.string().min(2).max(100).required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().min(2).max(3000).required(),
    image: Joi.string().required().pattern(regexUrl),
    trailer: Joi.string().required().pattern(regexUrl),
    nameRU: Joi.string().min(2).max(50).required(),
    nameEN: Joi.string().min(2).max(50).required(),
    thumbnail: Joi.string().required().pattern(regexUrl),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

// const updateAvatarValidation = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().pattern(regexUrl),
//   }),
// });

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    // avatar: Joi.string().pattern(regexUrl),
  }),
});

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
  updateProfileValidation,
  // updateAvatarValidation,
  loginValidation,
  createUserValidation,
};
