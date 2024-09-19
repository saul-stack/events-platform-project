import axios from "axios";
const API_BASE_URL = "http://localhost:9090/api";

const api = axios.create({ baseURL: API_BASE_URL });

export const getAllEvents = async () => {
  try {
    const result = await api.get("/events");
    const eventsArray = result.data.events;
    return eventsArray;
  } catch (error) {
    return (error = error.response.data.error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const result = await api.get(`/users/username/${username}`);
    const user = result.data.user;
  } catch (error) {
    throw error;
  }
};
