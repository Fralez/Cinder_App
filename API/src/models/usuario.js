const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

  nombreUsuario: { // *
    type: String,
    required: [true, 'No user?']
  },
  
  email: { // *
    type: String,
    required: [true, 'No email?']
  },
  
  edad: { // *
    type: Number,
    min: 18,
    required: [true, 'No age?']
  },
  
  sexo: { // *
    type: String,
    required: [true, 'No gender?']
  },

  sexoInteresado: {
    type: Array,
    validate: [sexoInteresadoLimit, 'More than 2 genders?'],
    required: [true, 'No interests?'],
  },
  
  ciudad: { // *
    type: String,
    required: [true, 'No city?']
  },
  
  pais: { // *
    type: String,
    required: [true, 'No country?']
  },
  
  meGusta: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }],
  
  noMeGusta: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }],

  frasePersonal: String,

  likes: [{
    type: String
  }],
  
  dislikes: [{
    type: String
  }]

});

function sexoInteresadoLimit(val) {
  return val.length <= 2;
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  Usuario
}