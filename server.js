const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const router = require('./routes.js');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser');
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('', router);

app.listen(port, async () => {
  console.log(`Listening on port:${port}`);
  await sequelize.sync();
  console.log('DB connected');
});
