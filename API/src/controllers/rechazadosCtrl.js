const { Usuario } = require('../models/usuario');
const { ObjectID } = require('mongodb');

module.exports = {	

  // Gets all user's bloqued users
  getBloqs: async (req, res, next) => {
    const { idUsuario } = req.params;
    
    if (!ObjectID.isValid(idUsuario)) {
      res.status(404).json({error: 'Error: idUsuario no válido'});
    }

    const user = await Usuario.findById(idUsuario).populate('rechazados', '_id');
    
    res.status(200).json(user.rechazados);
  },

  // Creates a bloqued user
  postBloq: async (req, res, next) => {
    try {
      const { idUsuario } = req.params;
      const { idBloq } = req.body;
      
      const user = await Usuario.findById(idUsuario);
      let { rechazados, _id } = user;
      
      const alreadyExists = rechazados.find( async element => {
        if (element == idBloq) {
          return true
        }
      });

      if (alreadyExists) {

        return res.status(200).json({error: "El usuario ya estaba marcado como rechazado", success: true, flag: "alreadyExists"});
      }

      rechazados.push(idBloq);
      await Usuario.findByIdAndUpdate(_id, user);
      
      res.status(200).json({message: "El usuario fue marcado como rechazado con éxito", success: true, flag: "newBloq"});

    } catch (err) {
        
      res.status(400).json({error: "No se pudo marcar como rechazado"});
    }
  }
  
}