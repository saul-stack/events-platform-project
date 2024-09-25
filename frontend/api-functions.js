import axios from "axios";
const API_BASE_URL = "http://localhost:9090/api";

const api = axios.create({ baseURL: API_BASE_URL });

export const getEvents = async (queries) => {
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
    return user;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const result = await api.get(`/events/${eventId}`);
    const event = result.data.event;
    return event;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const result = await api.get(`/users/${userId}`);
    const user = result.data.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const logUserIn = async (username, password) => {
  try {
    const result = await api.post("/login", { username, password });
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    throw error;
  }
};

export const postNewEvent = async (event) => {
  try {
    const result = await api.post("/events", event);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const watchEvent = async (userId, eventId) => {
  try {
    const currentUserObject = (await api.get(`/users/${userId}`)).data.user;
    const eventsWatched = currentUserObject.events_watched;

    eventsWatched.push(eventId);
    const result = await api.patch(`/users/${userId}`, {
      events_watched: eventsWatched,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unwatchEvent = async (userId, eventId) => {
  try {
    const currentUserObject = (await api.get(`/users/${userId}`)).data.user;
    let eventsWatched = currentUserObject.events_watched;

    eventsWatched = eventsWatched.filter((id) => id !== eventId);

    const result = await api.patch(`/users/${userId}`, {
      events_watched: eventsWatched,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
