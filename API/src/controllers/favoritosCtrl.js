const { Usuario } = require('../models/usuario');


module.exports = {	
  
  // Gets all user's favourites users
  getFavs: async (req, res, next) => {
    const { idUsuario } = req.params;
    const user = await Usuario.findById(idUsuario).populate('favoritos');
    
    res.status(200).json(user.favoritos);
  },

  // Creates a favourite user
  postFav: async (req, res, next) => {
    try {
      const { idUsuario } = req.params;
      const { idFav } = req.body;
      
      const user = await Usuario.findById(idUsuario);
      let { favoritos, _id } = user;
      
      const alreadyExists = favoritos.find( async element => {
        if (element == idFav) {
          return true
        }
      });

      if (alreadyExists) {
        
        res.status(200).json({error: "El usuario ya estaba marcado como favorito", success: true, flag: "alreadyExists"});
      } else {
        favoritos.push(idFav);
        await Usuario.findByIdAndUpdate(_id, user);
        
        res.status(200).json({message: "El usuario fue marcado como favorito con éxito", success: true, flag: "newFav"});
      }

    } catch (err) {

      res.status(400).json({error: "No se pudo marcar como favorito"});
    }
  }
  
}