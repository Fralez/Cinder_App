const express = require('express');
const Router = express.Router();

const ctrl = require('../controllers/favoritosCtrl');

// Gets all user's favourites users
Router.get('/:idUsuario', ctrl.getFavs);

// Creates a favourite user
Router.post('/:idUsuario', ctrl.postFav);


module.exports = {
	Router
}