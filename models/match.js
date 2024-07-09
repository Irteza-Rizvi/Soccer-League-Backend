const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  date: Date,
  score: { type: Map, of: Number },
});

module.exports = mongoose.model('Match', matchSchema);
