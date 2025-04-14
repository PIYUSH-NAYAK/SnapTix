const { fetchEventData } = require('../Service/groqService');

// Controller function to handle user input and Groq API interaction
const getEventDetails = async (req, res) => {
  const userInput = req.body.prompt;

  try {
    const eventDetails = await fetchEventData(userInput);
    res.json({ response: eventDetails });
  } catch (error) {
    console.error('Error fetching event data:', error);
    res.status(500).json({ response: 'Sorry, something went wrong.' });
  }
};

module.exports = { getEventDetails };

