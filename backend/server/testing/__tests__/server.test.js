const server = require("../../server");
const request = require("supertest");
const db = require("../../../database/connection.js");
const {
  fetchEndpointsData,
  fetchEventsData,
  fetchEventById,
} = require("../test-utils.js");

const newEvent = {
  title: "POST Test Event",
  date: "2022-12-31",
  day_of_week: "Saturday",
  time: "18:00:00",
  description: "This is a test event created by a POST request.",
  advance_price: 10.0,
  door_price: 15.0,
  tickets_total: 100,
  tickets_sold: 0,
  is_seated: true,
  is_ticketed: true,
  is_recurring: false,
};

let expectedEndpoints = {};
let defaultEventsArray = [];

beforeAll(async () => {
  expectedEndpoints = await fetchEndpointsData();
  defaultEventsArray = await fetchEventsData();
});

afterAll(async () => {
  await db.end();
});

describe("/api", () => {
  test("GET: responds (200) with expected JSON object", async () => {
    const response = await request(server).get("/api");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedEndpoints);
  });

  test("POST: responds (405) with expected JSON error object", async () => {
    const response = await request(server).post("/api");
    expect(response.status).toBe(405);
    expect(response.body).toEqual({ error: "POST Method Not Allowed on /api" });
  });

  test("PUT: responds (405) with expected JSON error object", async () => {
    const response = await request(server).put("/api");
    expect(response.status).toBe(405);
    expect(response.body).toEqual({ error: "PUT Method Not Allowed on /api" });
  });

  test("PATCH: responds (405) with expected JSON error object", async () => {
    const response = await request(server).patch("/api");
    expect(response.status).toBe(405);
    expect(response.body).toEqual({
      error: "PATCH Method Not Allowed on /api",
    });
  });

  test("DELETE: responds (405) with expected JSON error object", async () => {
    const response = await request(server).delete("/api");
    expect(response.status).toBe(405);
    expect(response.body).toEqual({
      error: "DELETE Method Not Allowed on /api",
    });
  });
});

describe("/api/events", () => {
  test("GET: responds (200) with expected JSON object", async () => {
    const response = await request(server).get("/api/events");
    expect(response.status).toBe(200);
    expect(response.body.events).toEqual(defaultEventsArray);
  });

  test("POST: responds (200) and successfully updates table", async () => {
    const updatedEventsArray = defaultEventsArray;
    updatedEventsArray.push(newEvent);
    const response = await request(server).post("/api/events").send(newEvent);
    expect(response.status).toBe(200);
    expect(response.body.events).toEqual(updatedEventsArray);
  });

  test("DELETE: responds (405) Method Not Allowed", async () => {
    const response = await request(server).delete("/api/events");
    expect(response.status).toBe(405);
    expect(response.body).toEqual({
      error: "DELETE Method Not Allowed on /api/events",
    });
  });

  test("PUT: responds (405) Method Not Allowed", async () => {
    const response = await request(server).put("/api/events");
    expect(response.status).toBe(405);
    expect(response.body).toEqual({
      error: "PUT Method Not Allowed on /api/events",
    });
  });

  test("PATCH: responds (405) Method Not Allowed", async () => {
    const response = await request(server).patch("/api/events");
    expect(response.status).toBe(405);
    expect(response.body).toEqual({
      error: "PATCH Method Not Allowed on /api/events",
    });
  });
});

describe("/api/events/:id", () => {
  describe("GET", () => {
    test("Event exists -> responds (200) with expected JSON object", async () => {
      const eventId = 1;
      const eventData = await fetchEventById(eventId);
      const response = await request(server).get(`/api/events/${eventId}`);
      expect(response.status).toBe(200);
      expect(response.body.event).toEqual(eventData);
    });

    test("Event does not exist -> responds (404) with expected JSON error object", async () => {
      const eventId = 99999;
      const response = await request(server).get(`/api/events/${eventId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: `Event with ID ${eventId} not found.`,
      });
    });

    test("Invalid request format -> responds (400) with expected JSON error object", async () => {
      const eventId = "invalid_event_id";
      const response = await request(server).get(`/api/events/${eventId}`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid request.",
      });
    });
  });

  describe("DELETE", () => {
    test("Event exists -> responds (200) and successfully updates table", async () => {
      const eventId = 1;
      const response = await request(server).delete(`/api/events/${eventId}`);
      const eventsArray = await fetchEventsData();
      const eventExists = eventsArray.some((event) => event.id === eventId);
      expect(response.status).toBe(200);
      expect(eventExists).toBe(false);
    });

    test("Event does not exist -> responds (404) with expected JSON error object", async () => {
      const eventId = 99999;
      const response = await request(server).delete(`/api/events/${eventId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: `Event with ID ${eventId} not found.`,
      });
    });

    test("Invalid request format -> responds (400) with expected JSON error object", async () => {
      const eventId = "invalid_event_id";
      const response = await request(server).delete(`/api/events/${eventId}`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid request.",
      });
    });
  });
});
