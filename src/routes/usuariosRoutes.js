const expressPromiseRouter = require('express-promise-router');
const Router = expressPromiseRouter();

const ctrl = require('../controllers/usuariosCtrl');

// Gets all the users
Router.get('/', ctrl.index);


// // Creates a new user
// Router.post('/:idUsuario', );

// // Gets a user's details
// Router.get('/:idUsuario', );

// // Modifies a user's details
// Router.put('/:idUsuario', );

// // Deletes a user
// Router.delete('/:idUsuario', );


module.exports = {
	Router
}