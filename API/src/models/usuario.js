const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

  nombreUsuario: { // *
    type: String,
    required: [true, 'No user?']
  },
  
  email: { // *
    type: String,
    validate: [validateEmail, 'Not a valid email?'],
    required: [true, 'No email?']
  },
  
  edad: { // *
    type: Number,
    min: 18,
    required: [true, 'No age?']
  },
  
  sexo: { // *
    type: String,
    enum: ['M', 'F'],
    required: [true, 'No gender?']
  },

  sexoInteresado: {
    type: String,
    enum: ['M', 'F', 'A']
  },
  
  ciudad: { // *
    type: String,
    required: [true, 'No city?']
  },
  
  pais: { // *
    type: String,
    required: [true, 'No country?']
  },

  frasePersonal: String,

  meGusta: [{
    type: String
  }],
  
  noMeGusta: [{
    type: String
  }],
  
  favoritos: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }],
  
  rechazados: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }]

});

function validateEmail(email) {
  var EmailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EmailRegEx.test(email);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  Usuario
}