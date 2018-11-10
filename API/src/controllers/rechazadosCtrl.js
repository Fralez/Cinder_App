const { Usuario } = require('../models/usuario');


module.exports = {	

  getBloqs: async (req, res, next) => {
    const { idUsuario } = req.params;
    const user = await Usuario.findById(idUsuario).populate('noMeGusta');
    res.status(200).json(user.noMeGusta);
  },

  postBloq: async (req, res, next) => {
    try {
      const { idUsuario } = req.params;
      const { idBloq } = req.body;
      
      const user = await Usuario.findById(idUsuario);
      let { noMeGusta, _id } = user;
      
      const alreadyExists = noMeGusta.find( async element => {
        if (element == idBloq) {
          return true
        }
      });

      if (alreadyExists) {
        res.status(200).json({error: "El usuario ya estaba marcado como rechazado", success: true});
      } else {
        noMeGusta.push(idBloq);
        await Usuario.findByIdAndUpdate(_id, user);
        res.status(200).json({message: "El usuario fue marcado como rechazado con éxito", success: true});
      }
      
      

    } catch (err) {
        res.status(400).json({error: "No se pudo marcar como rechazado"});
        console.log(err);
    }
  }
  
}