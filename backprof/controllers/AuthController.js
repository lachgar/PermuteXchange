const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Professeur = require('../models/Professeur');

// Route pour l'authentification d'un professeur
router.post('/login', async (req, res) => {v
  const { email, password } = req.body;

  try {
    // Recherche du professeur dans la base de données
    const professeur = await Professeur.findOne({ email });

    if (!professeur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Comparaison du mot de passe fourni avec le mot de passe hashé enregistré
    const isMatch = await professeur.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Génération du token d'authentification
    const token = jwt.sign({ professeurId: professeur._id }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'authentification' });
  }
});

module.exports = router;
