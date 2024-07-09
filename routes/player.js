const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// Create a player
router.post('/', async (req, res) => {
  const player = new Player(req.body);
  try {
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a player
router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
