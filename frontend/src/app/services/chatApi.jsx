import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return { success: false, data: [] };
  }
};

export const searchEvents = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/events/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching events:', error);
    return { success: false, data: [] };
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return { success: false, data: null };
  }
};

export const askAI = async (query) => {
  try {
    const response = await axios.post(`${API_URL}/groq`, { query });
    
    // If the response contains the rejection message, return an empty events array
    if (response.data.reply && response.data.reply.includes("I think there might be some confusion!")) {
      return {
        success: true,
        reply: response.data.reply,
        events: [] // Don't return any events for non-event queries
      };
    }
    
    return response.data;
  } catch (error) {
    console.error('Error querying AI:', error);
    return { 
      success: false, 
      reply: 'Sorry, I had trouble processing your request.',
      events: []
    };
  }
};
// Add this function to your existing chatApi.js file
export async function fetchEventById(eventId) {
  try {
    const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}
// Add this new function to your existing file

export const getSuggestedEvents = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/events/suggested`, {
      params: { id: eventId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching suggested events:', error);
    return { success: false, data: [] };
  }
};