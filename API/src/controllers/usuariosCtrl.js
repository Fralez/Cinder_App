const { Usuario } = require('../models/usuario');

module.exports = {	
	
	// Gets all the users
	index: async (req, res, next) => {
		const users = await Usuario.find({});

		res.status(200).json(users);
	},
	
	// Creates a new user
	postUser: async (req, res, next) => {
		try {
			const newUser = new Usuario(req.body);
			await newUser.save();

			// POSSIBLE SOLUTION: same meGusta && noMeGusta item

			// if (newUser.meGusta && newUser.noMeGusta) {
			// 	newUser.meGusta.find(meGusta => {
			// 		return newUser.noMeGusta.find(noMeGusta => {
			// 			return meGusta == noMeGusta;
			// 		});
			// 	});
			// }
			
			res.status(201).json(newUser);

		} catch (err) {
			
			res.status(400).json({error: "Pedido equivocado. Faltan datos de usuario o están equivocados"});
		}
	},
	
	// Gets a user's details
	getUser: async (req, res, next) => {
		const { idUsuario } = req.params;
		
		try {
			const user = await Usuario.findById(idUsuario);
			
			res.status(200).json(user);
		
		} catch (err) {
			
			res.status(404).json({error: "idUsuario no es válido"});
		}
	},
	
	// Modifies a user's details
	putUser: async (req, res, next) => {
		const { idUsuario } = req.params;
		const newUser = req.body;

		let validated = null;
		await new Usuario(newUser).validate(err => {
			if (err) {
				validated = false;
			} else {
				validated = true;
			}
		});
		
		if (!validated) {

			res.status(400).json({error: "Pedido equivocado. Faltan datos de usuario o están equivocados"});
		} else {
			try {
				await Usuario.findByIdAndUpdate(idUsuario, newUser);
				
				res.status(200).json(newUser);
			
			} catch (err) {
				
				res.status(404).json({error: "idUsuario no es válido"});
			}
		}
	},
	
	// Deletes a user
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