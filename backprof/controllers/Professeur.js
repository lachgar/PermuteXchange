const express = require('express');
const Professeur = require('../models/Professeur.js');

const router = express.Router();

// Route pour ajouter un nouveau professeur
router.post('/professeurs', async (req, res) => {
  const professeur = new Professeur(req.body);
  try {
    await professeur.save();
    res.status(201).send(professeur);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route pour récupérer tous les professeurs
router.get('/professeurs', async (req, res) => {
  try {
    const options = { maxTimeMS: 20000 }; // Increase timeout to 20 seconds
    const professeurs = await Professeur.find({}, null, options);
    res.send(professeurs);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
