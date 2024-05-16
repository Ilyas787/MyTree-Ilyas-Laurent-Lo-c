const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const RelativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  sexe: {
    type: String,
    required: true
  },
  yearOfDeath: {
    type: String,
    required: false
  }
});


module.exports = mongoose.model('Relative', RelativeSchema);
