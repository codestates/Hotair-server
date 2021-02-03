const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());
app.use('/', (req, res) => {
  res.send('Hello World');
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
