const { Usuario } = require('../models/usuario');

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
          _id: coincidence._id,
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

      // An array with the 20 most matching users Id's
      bestCoincidences = [
        ...(coincidenceRates.map(item => item._id).slice(0, 19))
      ]; 
      
      res.status(200).json(bestCoincidences);
      
    } catch (err) {
      res.status(404).json({error: "El usuario con idUsuario no pudo ser encontrado"});
    }
    
  }
}