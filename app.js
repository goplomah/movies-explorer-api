require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const handlerCentralError = require('./middlewares/handlerCentralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb '
} = process.env;
// const MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb ';

mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to bitfilmsdb');
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use(helmet());

app.use(requestLogger);

app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(handlerCentralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
