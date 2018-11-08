const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  _ID: Schema.Types.ObjectId,

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
    type: String,
    ref: 'usuariosMeGusta'
  }],

  noMeGusta: [{
    type: String,
    ref: 'usuariosNoMeGusta'
  }]

});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  Usuario
}