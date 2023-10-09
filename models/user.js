const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizationError = require('../errors/UnauthorizationError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'поле "email" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isEmail(v),
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'максимальная длина поля "name" - 30'],
      default: 'Пользователь',
      required: true,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function login(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizationError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizationError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
