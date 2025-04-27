import axios from 'axios';
import { auth } from "../../config/firebase";

// Configure axios with authentication
const getAuthenticatedAxios = async () => {
  const currentUser = auth.currentUser;
  let token = null;
  
  if (currentUser) {
    token = await currentUser.getIdToken();
  }
  
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: token ? { 
      'Authorization': `Bearer ${token}` 
    } : {}
  });
};

export const fetchAllEvents = async () => {
  try {
    // For public endpoints, no authentication needed
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return { success: false, data: [] };
  }
};

export const getUserTickets = async () => {
  try {
    // For protected endpoints, use authenticated axios instance
    const axiosAuth = await getAuthenticatedAxios();
    const response = await axiosAuth.get('/tickets');
    return response.data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    return { success: false, data: [] };
  }
};

// Apply similar pattern to other API calls that need authentication