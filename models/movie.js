const mongoose = require('mongoose');

const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      minlength: [2, 'минимальная длина поля "country" - 2'],
      maxlength: [30, 'максимальная длина поля "country" - 30'],
      required: true,
    },
    director: {
      type: String,
      minlength: [2, 'минимальная длина поля "director" - 2'],
      maxlength: [30, 'максимальная длина поля "director" - 30'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minlength: [2, 'минимальная длина поля "description" - 2'],
      maxlength: [200, 'максимальная длина поля "description" - 200'],
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
