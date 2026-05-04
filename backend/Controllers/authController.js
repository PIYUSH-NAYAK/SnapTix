const User = require('../Models/User');
const Booking = require('../Models/Booking');

const syncUser = async (req, res) => {
  const { uid, email, displayName, photoURL, provider } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ uid, email, displayName, photoURL, provider });
    } else {
      user.email = email;
      if (displayName) user.displayName = displayName;
      if (photoURL) user.photoURL = photoURL;
      await user.save();
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleSavedEvent = async (req, res) => {
  const { eventId } = req.body;
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const idx = user.savedEvents.indexOf(eventId);
    if (idx === -1) {
      user.savedEvents.push(eventId);
    } else {
      user.savedEvents.splice(idx, 1);
    }
    await user.save();
    res.json({ success: true, savedEvents: user.savedEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userUid: req.user.uid }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBooking = async (req, res) => {
  const { eventId, eventTitle, eventDate, eventLocation, eventImage, seatInfo, price, txHash } = req.body;
  try {
    const booking = await Booking.create({
      userUid: req.user.uid,
      eventId,
      eventTitle,
      eventDate,
      eventLocation,
      eventImage,
      seatInfo,
      price,
      txHash,
    });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.bookingId, userUid: req.user.uid },
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookedSeats = async (req, res) => {
  const { eventId } = req.params;
  try {
    const bookings = await Booking.find({ eventId, status: 'confirmed' }, 'seatInfo');
    const seats = bookings.map((b) => b.seatInfo).filter(Boolean);
    res.json({ success: true, seats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { syncUser, getProfile, updateProfile, toggleSavedEvent, getMyBookings, createBooking, cancelBooking, getBookedSeats };
