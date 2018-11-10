const expressPromiseRouter = require('express-promise-router');
const Router = expressPromiseRouter();

const ctrl = require('../controllers/rechazadosCtrl');

Router.get('/:idUsuario', ctrl.getBloqs);

Router.post('/:idUsuario', ctrl.postBloq);

module.exports = {
  Router
}