const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: false
  },
  sexe: {
    type: String,
    required: true
  },
  yearOfDeath: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  spouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  parentsId: {
    type: String
  }
});

// Hash the password before saving the user to the database
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// Compare the candidate password with the stored hash
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
