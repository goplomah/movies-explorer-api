const handlerCentralError = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'на сервере произошла ошибка' : err.message });
  next();
};

module.exports = handlerCentralError;
