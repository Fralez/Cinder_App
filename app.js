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

// Routes middlewares
const usuariosRoutes = require('./src/routes/usuariosRoutes').Router;
const favoritosRoutes = require('./src/routes/favoritosRoutes').Router;
const rechazadosRoutes = require('./src/routes/rechazadosRoutes').Router;
const coincidenciasRoutes = require('./src/routes/coincidenciasRoutes').Router;


// Routes
app.use('/usuarios', usuariosRoutes);
app.use('/favoritos', favoritosRoutes);
app.use('/rechazados', rechazadosRoutes);
app.use('/coincidencias', coincidenciasRoutes);

app.set('port', process.env.PORT || 8081);
const PORT = app.get('port');

app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});