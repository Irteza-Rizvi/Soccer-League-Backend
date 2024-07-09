const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// Create a match
router.post('/', async (req, res) => {
  const match = new Match(req.body);
  try {
    const savedMatch = await match.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().populate('teams');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a match by ID
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('teams');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a match
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a match
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
