const expressPromiseRouter = require('express-promise-router');
const Router = expressPromiseRouter();

const ctrl = require('../controllers/favoritosCtrl');

Router.get('/:idUsuario', ctrl.getFavs);

Router.post('/:idUsuario', ctrl.postFav);


module.exports = {
	Router
}