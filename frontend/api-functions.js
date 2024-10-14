import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:9090/api";

const api = axios.create({ baseURL: API_BASE_URL });

export const getEvents = async (params) => {
  try {
    const result = await api.get("/events", { params });
    const eventsArray = result.data.events;
    return eventsArray;
  } catch (error) {
    throw new Error("There was an error loading our upcoming events.");
  }
};

export const getUserByUsername = async (username) => {
  try {
    const result = await api.get(`/users/username/${username}`);
    const user = result.data.user;
    return user;
  } catch (error) {
    throw new Error("Error fetching users.");
  }
};

export const getEventById = async (eventId) => {
  try {
    const result = await api.get(`/events/${eventId}`);
    const event = result.data.event;
    return event;
  } catch (error) {
    throw new Error("That event could not be found.");
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

export const unwatchEvent = async (userId, eventId) => {
  try {
    const currentUserObject = (await api.get(`/users/${userId}`)).data.user;
    let eventsWatched = currentUserObject.events_watched;

    eventsWatched = eventsWatched.filter((id) => id !== eventId);

    await api.patch(`/users/${userId}`, {
      events_watched: eventsWatched,
    });
  } catch (error) {
    throw new Error("Failed to unwatch event.");
  }
};

export const watchEvent = async (userId, eventId) => {
  try {
    const currentUserObject = (await api.get(`/users/${userId}`)).data.user;
    const eventsWatched = currentUserObject.events_watched;

    eventsWatched.push(eventId);
    await api.patch(`/users/${userId}`, {
      events_watched: eventsWatched,
    });
  } catch (error) {
    throw new Error("Failed to add event to watchlist.");
  }
};

export const bookEvent = async (userId, eventId) => {
  try {
    const currentUserObject = (await api.get(`/users/${userId}`)).data.user;
    const eventsBooked = currentUserObject.events_booked;

    eventsBooked.push(eventId);
    const result = await api.patch(`/users/${userId}`, {
      events_booked: eventsBooked,
    });
  } catch (error) {
    throw new Error("Failed to book event.");
  }
};

export const sendStripePaymentRequest = async (eventId) => {
  const event = await getEventById(eventId);
  const result = await api.post("/create-checkout-session", {
    price: event.advance_price,
    eventId: event.id,
    title: event.title,
  });
  return result;
};
