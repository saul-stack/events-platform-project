import axios from "axios";
const API_BASE_URL = "http://localhost:9090/api";

const api = axios.create({ baseURL: API_BASE_URL });

export const getAllEvents = async () => {
  const result = await api.get("/events");
  const eventsArray = result.data.events;
  return eventsArray;
};
