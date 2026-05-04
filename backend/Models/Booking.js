const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userUid: { type: String, required: true, index: true },
  eventId: { type: String, required: true },
  eventTitle: { type: String },
  eventDate: { type: String },
  eventLocation: { type: String },
  eventImage: { type: String },
  seatInfo: { type: String },
  price: { type: String },
  txHash: { type: String },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
