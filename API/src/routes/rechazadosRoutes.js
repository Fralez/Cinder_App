const express = require('express');
const Router = express.Router();

const ctrl = require('../controllers/rechazadosCtrl');

// Gets all user's bloqued users
Router.get('/:idUsuario', ctrl.getBloqs);

// Creates a bloqued user
Router.post('/:idUsuario', ctrl.postBloq);

module.exports = {
  Router
}