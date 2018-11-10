const expressPromiseRouter = require('express-promise-router');
const Router = expressPromiseRouter();

const { coincidencias } = require('../controllers/coincidenciasCtrl');

Router.get('/:idUsuario', coincidencias);

module.exports = {
	Router
}