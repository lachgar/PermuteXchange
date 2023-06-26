const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const professeurSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  specialite: {
    type: String,
    required: true
  },
  faculteActuelle: {
    type: String,
    required: true
  },
  villeFaculteActuelle: {
    type: String,
    required: true
  },
  villeDesiree: {
    type: String,
    required: true
  }
});

professeurSchema.add({
  password: {
    type: String
    //required: true
  }
});

// Avant de sauvegarder le Professeur dans la base de données,
// on doit hasher son mot de passe avec Bcrypt
professeurSchema.pre('save', async function(next) {
  const professeur = this;
  if (!professeur.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(professeur.password, salt);
  professeur.password = hash;
  next();
});

// Méthode pour comparer les mots de passe hashés
professeurSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const Professeur = mongoose.model('Professeur', professeurSchema);

module.exports = Professeur;
