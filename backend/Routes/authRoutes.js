const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Middleware/authMiddleware');
const {
  syncUser,
  getProfile,
  updateProfile,
  toggleSavedEvent,
  getMyBookings,
  createBooking,
  cancelBooking,
  getBookedSeats,
} = require('../Controllers/authController');

router.post('/auth/sync', syncUser);
router.get('/auth/profile', verifyToken, getProfile);
router.put('/auth/profile', verifyToken, updateProfile);
router.post('/auth/saved-events', verifyToken, toggleSavedEvent);
router.get('/bookings', verifyToken, getMyBookings);
router.post('/bookings', verifyToken, createBooking);
router.delete('/bookings/:bookingId', verifyToken, cancelBooking);
router.get('/events/:eventId/booked-seats', getBookedSeats);

module.exports = router;
