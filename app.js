const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');

// Connected to database mongoose
const { mongoose } = require('./db/connect');
mongoose.Promise = global.Promise;

// Create app
const app = express();

// Dev uses:
app.use(bodyParser.json());
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);
const PORT = app.get('port');

app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});