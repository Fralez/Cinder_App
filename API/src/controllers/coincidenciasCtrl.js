const { Usuario } = require('../models/usuario');

/**
 * PASOS A SEGUIR:
 * [X] 1: Get a todos los usuarios que esten en la misma ciudad y pais que el usuario && que su ID no pertenezca a las listas de favoritos y rechazados && sexo == sexoInteresado
 * [] 2: Ordenar por coincidencias de cosas que le gustan al usuario y cosas que no le gustan al usuario
 * [] 3: Tomar los primeros 20 (los 20 que son mas compatibles)
 */

module.exports = {
  coincidencias: async (req, res, next) => {
    const { idUsuario } = req.params;
    
    try {
      const user = await Usuario.findById(idUsuario);
      
      const userFavs = user.favoritos;
      const userBloqs = user.rechazados;
      

      let coincidences = await Usuario.find(
        {
          ciudad: user.ciudad,
          pais: user.pais,

          $or: [{
            sexo: [ ...(user.sexoInteresado == 'A' ? ['F', 'M'] : user.sexoInteresado) ] 
          }]
        }
      );

      coincidences = removeFavsAndBloqs(coincidences);

      function removeFavsAndBloqs(coincidences) {
        const newCoincidences = coincidences.filter(coincidence => {
          
          const isInFavs = userFavs.some(favUserId => {
            return JSON.stringify(coincidence._id) === JSON.stringify(favUserId);
          });
          const isInBloqs = userBloqs.some(bloqUserId => {
            return JSON.stringify(coincidence._id) === JSON.stringify(bloqUserId);
          });

          return !isInFavs && !isInBloqs;
        });
        
        return newCoincidences;
      }

      let coincidenceRates = []; // This stores the Rating objects

      /**
       * Rating Object:
       * UserID: ObjectId,
       * LikeRate: Number, // Total Likes rate - +1 when the users share a like
       * DislikeRate: Number // Total Dislikes rate - +1 when the main user like is a secondary user dislike
       * TotalRate: Number // This equals to LikeRate - DislikeRate
       */

      
      res.status(200).json(coincidences);
      
    } catch (err) {
      console.log('ERROR! ', err);
      res.status(404).json({error: "El usuario con idUsuario no pudo ser encontrado"});
    }
    
  }
}