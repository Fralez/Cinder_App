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
      // USER
      const user = await Usuario.findById(idUsuario);
      
      let coincidences = await Usuario.find(
        {
          ciudad: user.ciudad,
          pais: user.pais,
          
          $or: [{
            sexo: [ ...(user.sexoInteresado == 'A' ? ['F', 'M'] : user.sexoInteresado) ] 
          }]
        }
      );
      
      coincidences = removeFavsAndBloqs(coincidences, user);
        
      function removeFavsAndBloqs(coincidences, user) {
        const userFavs = user.favoritos;
        const userBloqs = user.rechazados;
        
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
       * RATING OBJECT:
       * UserID: ObjectId,
       * LikeRate: Number, // Total Likes rate - +1 when the users share a like
       * DislikeRate: Number // Total Dislikes rate - +1 when the users share a dislike
       * TotalRate: Number // This equals to LikeRate + DislikeRate
       */

      await coincidences.forEach(coincidence => {
        // Rating object:
        let ratingObject = {
          userId: coincidence._id,
          likeRate: 0,
          dislikeRate: 0,
          get totalRate() {
            return this.likeRate + this.dislikeRate;
          },
        };
        // Like Rate:
        coincidence.meGusta.forEach(meGusta => {
          if (user.meGusta.includes(meGusta)) {
            ratingObject.likeRate++;
          }
        });
        // Dislike Rate
        coincidence.noMeGusta.forEach(noMeGusta => {
          if (user.noMeGusta.includes(noMeGusta)) {
            ratingObject.dislikeRate++;
          }
        });
        coincidenceRates.push(ratingObject);
      });

      coincidenceRates.sort((a, b) => {
        // ascendent order
        return b.totalRate - a.totalRate;
      });

      const bestCoincidenceRates = coincidenceRates.slice(0, 19); // The 20 most matching users
      
      res.status(200).json(bestCoincidenceRates);
      
    } catch (err) {
      res.status(404).json({error: "El usuario con idUsuario no pudo ser encontrado"});
    }
    
  }
}