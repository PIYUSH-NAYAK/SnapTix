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
