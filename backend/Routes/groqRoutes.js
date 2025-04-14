



const express = require('express');
const router = express.Router();
const { getEventDetails } = require('../Controllers/groqController');

router.post('/groq', getEventDetails);

module.exports = router;