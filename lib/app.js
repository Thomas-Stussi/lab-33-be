const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/api/v1/recipes', require('./controller/recipes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
