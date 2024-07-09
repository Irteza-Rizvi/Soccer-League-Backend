const express = require('express');
const router = express.Router();
const Standing = require('../models/standing');

// Get all standings
router.get('/', async (req, res) => {
  try {
    const standings = await Standing.find().populate('team');
    res.json(standings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
