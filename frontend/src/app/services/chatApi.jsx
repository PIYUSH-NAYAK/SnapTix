import axios from 'axios';
import { auth } from "../../config/firebase";

// API URL based on environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://snaptix.onrender.com/api'  // Production backend URL
  : 'http://localhost:5000/api';        // Development backend URL

// Configure axios with authentication
const getAuthenticatedAxios = async () => {
  const currentUser = auth.currentUser;
  let token = null;
  
  if (currentUser) {
    token = await currentUser.getIdToken();
  }
  
  return axios.create({
    baseURL: API_URL,
    headers: token ? { 
      'Authorization': `Bearer ${token}` 
    } : {}
  });
};

// Public endpoints (no auth required)
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





// Update fetch-based function to use the API_URL variable for consistency
export async function fetchEventById(eventId) {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`);
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

// Protected endpoints (require authentication)
export const getUserTickets = async () => {
  try {
    const axiosAuth = await getAuthenticatedAxios();
    const response = await axiosAuth.get('/tickets');
    return response.data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    return { success: false, data: [] };
  }
};

export const purchaseTicket = async (ticketData) => {
  try {
    const axiosAuth = await getAuthenticatedAxios();
    const response = await axiosAuth.post('/tickets/purchase', ticketData);
    return response.data;
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to purchase ticket' 
    };
  }
};

export const transferTicket = async (ticketId, recipientEmail) => {
  try {
    const axiosAuth = await getAuthenticatedAxios();
    const response = await axiosAuth.post('/tickets/transfer', { 
      ticketId,
      recipientEmail 
    });
    return response.data;
  } catch (error) {
    console.error('Error transferring ticket:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to transfer ticket' 
    };
  }
};