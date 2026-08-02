import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const generateItinerary = async (city, vibe, duration) => {
  const response = await axios.post(`${BASE_URL}/api/itinerary`, {
    city,
    vibe,
    duration,
  });
  return response.data;
};