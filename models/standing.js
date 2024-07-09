const mongoose = require('mongoose');

const standingSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  points: Number,
  wins: Number,
  losses: Number,
  draws: Number,
});

module.exports = mongoose.model('Standing', standingSchema);
