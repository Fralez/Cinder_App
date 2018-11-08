const { Usuario } = require('../models/usuario');
module.exports = {
	
	
	index: async (req, res, next) => {
		const users = await Usuario.find({});
		res.status(200).json(users);
	},
	
	
}