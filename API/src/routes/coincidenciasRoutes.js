const express = require('express');
const Router = express.Router();

const { coincidencias } = require('../controllers/coincidenciasCtrl');

// Gets the first 20 coincidences
Router.get('/:idUsuario', coincidencias);

module.exports = {
	Router
}