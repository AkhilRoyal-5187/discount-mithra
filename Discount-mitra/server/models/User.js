const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idNo: {
    type: String,
    required: true,
    unique: true
  },
  cardHolderName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  family2: {
    type: String
  },
  family3: {
    type: String
  },
  family4: {
    type: String
  },
  family5: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  validTill: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);