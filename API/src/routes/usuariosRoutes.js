const expressPromiseRouter = require('express-promise-router');
const Router = expressPromiseRouter();

const ctrl = require('../controllers/usuariosCtrl');

// Gets all the users
Router.get('/', ctrl.index);

// Creates a new user
Router.post('/', ctrl.postUser);

// Gets a user's details
Router.get('/:idUsuario', ctrl.getUser);

// Modifies a user's details
Router.put('/:idUsuario', ctrl.putUser);

// Deletes a user
Router.delete('/:idUsuario', ctrl.deleteUser);


module.exports = {
	Router
}