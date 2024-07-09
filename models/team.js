const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  country: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

module.exports = mongoose.model('Team', teamSchema);
