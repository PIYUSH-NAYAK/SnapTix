const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, default: '' },
  photoURL: { type: String, default: '' },
  provider: { type: String, default: 'email' },
  savedEvents: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
