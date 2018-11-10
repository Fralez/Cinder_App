const { Usuario } = require('../models/usuario');

module.exports = {	
	
	index: async (req, res, next) => {
		const users = await Usuario.find({});
		res.status(200).json(users);
	},

	postUser: async (req, res, next) => {
		try {
			const newUser = new Usuario(req.body);
			await newUser.save();
			res.status(201).json(newUser);
		} catch (err) {
			res.status(400).json({error: "Pedido equivocado. Faltan datos de usuario o están equivocados"});
		}
	},

	getUser: async (req, res, next) => {
		const { idUsuario } = req.params;
		try {
			const user = await Usuario.findById(idUsuario);
			res.status(200).json(user);
		} catch (err) {
			res.status(404).json({error: "idUsuario no es válido"});
		}
	},

	putUser: async (req, res, next) => {
		const { idUsuario } = req.params;
		const newUser = req.body;

		let validated = null;
		await new Usuario(newUser).validate(err => {
			if (err) {
				validated = false;
				console.log(err);
			} else {
				validated = true;
				console.log("estoy validadi :D");
			}
		})
		
		if (!validated) {
			res.status(400).json({error: "Pedido equivocado. Faltan datos de usuario o están equivocados"});
		} else {
			try {
				await Usuario.findByIdAndUpdate(idUsuario, newUser);
				res.status(200).json(newUser);
			} catch (err) {
				res.status(404).json({error: "idUsuario no es válido"});
				console.log(err);
			}
		}
	},

	deleteUser: async (req, res, next) => {
		try {
			const { idUsuario } = req.params;
			const deletedUser = await Usuario.findByIdAndDelete(idUsuario);
			res.status(200).json(deletedUser);
		} catch (err) {
			res.status(404).json({error: "idUsuario no es válido"});
		}
	}
	
}