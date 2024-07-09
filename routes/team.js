const express = require('express');
const router = express.Router();
const Team = require('../models/team');

// Create a team
router.post('/', async (req, res) => {
  const team = new Team(req.body);
  try {
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
