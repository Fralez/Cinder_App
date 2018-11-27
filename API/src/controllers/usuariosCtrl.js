const { Usuario } = require('../models/usuario');
const { ObjectID } = require('mongodb');

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

			// Verify likes & dislikes items
			if (newUser.meGusta && newUser.noMeGusta) {
				const sameItem = newUser.meGusta.find(meGusta => {
					return newUser.noMeGusta.find(noMeGusta => {
						return meGusta == noMeGusta;
					});
				});
				if (sameItem) {
					throw new Error('Error: Same meGusta && noMeGusta item');
				}
			}
			
			res.status(201).json(newUser);

		} catch (err) {
			res.status(400).json({ error: "Pedido equivocado. Faltan datos de usuario o están equivocados" });
		}
	},
	
	// Gets a user's details
	getUser: async (req, res, next) => {
		
		try {
			const { idUsuario } = req.params;
			
			if (!ObjectID.isValid(idUsuario)) {
				throw new Error('Error: idUsuario no válido')
			}
			
			const user = await Usuario.findById(idUsuario);
			if (user) {

				return res.status(200).json(user);
			} else {
				throw new Error('Error: usuario null')
			}

		} catch (err) {
			
			return res.status(404).json({error: err});
		}
	},
	
	// Modifies a user's details
	putUser: async (req, res, next) => {
		const { idUsuario } = req.params;

		if (!ObjectID.isValid(idUsuario)) {
			return res.status(404).json({error: "idUsuario no es válido"});
		}

		try {
			const newUser = req.body;

			await Usuario.findByIdAndUpdate(idUsuario, newUser);
			
			res.status(200).json(newUser);
			
		} catch (err) {

			res.status(400).json({error: "Fallo en actualizar los datos del usuario"});
		}
	},
	
	// Deletes a user
	deleteUser: async (req, res, next) => {
		const { idUsuario } = req.params;
		
		if (!ObjectID.isValid(idUsuario)) {
			return res.status(404).json({error: "idUsuario no es válido"});
		}
		
		const deletedUser = await Usuario.findByIdAndDelete(idUsuario);
		
		res.status(200).json(deletedUser);
	}

}