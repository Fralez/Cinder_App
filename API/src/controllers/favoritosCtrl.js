const { Usuario } = require('../models/usuario');


module.exports = {	

  getFavs: async (req, res, next) => {
    const { idUsuario } = req.params;
    const user = await Usuario.findById(idUsuario).populate('meGusta');
    res.status(200).json(user.meGusta);
  },

  postFav: async (req, res, next) => {
    try {
      const { idUsuario } = req.params;
      const { idFav } = req.body;
      
      const user = await Usuario.findById(idUsuario);
      let { meGusta, _id } = user;
      
      const alreadyExists = meGusta.find( async element => {
        if (element == idFav) {
          return true
        }
      });

      if (alreadyExists) {
        res.status(200).json({error: "El usuario ya estaba marcado como favorito", success: true});
      } else {
        meGusta.push(idFav);
        await Usuario.findByIdAndUpdate(_id, user);
        res.status(200).json({message: "El usuario fue marcado como favorito con éxito", success: true});
      }
      
      

    } catch (err) {
        res.status(400).json({error: "No se pudo marcar como favorito"});
        console.log(err);
    }
  }
  
}