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

beforeAll(async () => {
  expectedEndpoints = await fetchEndpointsData();
  defaultEventsArray = await fetchEventsData();
});

afterAll(() => {
  db.end();
});

describe("/api", () => {
  test("GET: responds (200) with expected JSON object", async () => {
    return request(server)
      .get("/api")
      .expect(200)
      .then(async (response) => {
        expect(response.body).toEqual(expectedEndpoints);
      });
  });

  test("POST: responds (405) with expected JSON error object", () => {
    return request(server)
      .post("/api")
      .expect(405)
      .then((response) => {
        expect(response.body).toEqual({
          error: "POST Method Not Allowed on /api",
        });
      });
  });

  test("PUT: responds (405) with expected JSON error object", () => {
    return request(server)
      .put("/api")
      .expect(405)
      .then((response) => {
        expect(response.body).toEqual({
          error: "PUT Method Not Allowed on /api",
        });
      });
  });

  test("DELETE: responds (405) with expected JSON error object", () => {
    return request(server)
      .delete("/api")
      .expect(405)
      .then((response) => {
        expect(response.body).toEqual({
          error: "DELETE Method Not Allowed on /api",
        });
      });
  });

  test("PATCH: responds (405) with expected JSON error object", () => {
    return request(server)
      .patch("/api")
      .expect(405)
      .then((response) => {
        expect(response.body).toEqual({
          error: "PATCH Method Not Allowed on /api",
        });
      });
  });

  describe.only("/events", () => {
    test("GET: responds (200) with expected JSON object", async () => {
      return request(server)
        .get("/api/events")
        .expect(200)
        .then((response) => {
          expect(response.body.events).toEqual(defaultEventsArray);
        });
    });

    test("POST: responds (200) and successfully updates table", () => {
      const updatedEventsArray = defaultEventsArray;
      updatedEventsArray.push(newEvent);
      return request(server)
        .post("/api/events", newEvent)
        .expect(200)
        .then((response) => {
          expect(response.body.events).toEqual(updatedEventsArray);
        });
    });

    describe("/events/:id", () => {
      test("GET: responds (200) with expected JSON object", async () => {
        const eventId = 1;
        const eventData = await fetchEventById(eventId);
        return request(server)
          .get(`/api/events/${eventId}`)
          .expect(200)
          .then((response) => {
            expect(response.body.event).toEqual(eventData);
          });
      });
    });
  });
});
