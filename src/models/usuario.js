const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  _ID: Schema.Types.ObjectId,

  nombreUsuario: { // *
    type: String,
    required: true
  },
  
  email: { // *
    type: String,
    required: true
  },
  
  edad: { // *
    type: Number >= 18,
    required: true
  },
  
  sexo: { // *
    type: String,
    required: true
  },
  
  ciudad: { // *
    type: String,
    required: true
  },
  
  pais: { // *
    type: String,
    required: true
  },
  
  frasePersonal: String,
  
  meGusta: {
    type: String,
    ref: 'usuariosMeGusta'
  },

  noMeGusta: {
    type: String,
    ref: 'usuariosNoMeGusta'
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  Usuario
}