const server = require("../../server.js");
const request = require("supertest");
const db = require("../../../database/connection.js");
const { fetchTableData, fetchTableEntry } = require("../test-utils.js");
const {
  seedTestTable,
} = require("../../../database/test-data/seed-test-tables.js");

//prettier-ignore
const newEvent = {
  "title": "POST Test Event",
  "date": "2022-12-31",
  "day_of_week": "Saturday",
  "time": "18:00:00",
  "description": "This is a test event created by a POST request.",
  "advance_price": "10.0",
  "door_price": "15.0",
  "tickets_total": "100",
  "tickets_sold": "0",
  "is_seated": "true",
  "is_ticketed": "true",
  "is_recurring": "false"
};
let defaultEventsArray = [];

beforeAll(async () => {
  await seedTestTable("events");
  defaultEventsArray = await fetchTableData("events");
});

beforeEach(async () => {
  await seedTestTable("events");
});

afterAll(async () => {
  await db.end();
});

describe("/api/events", () => {
  test("GET: responds (200) with expected JSON object", async () => {
    const response = await request(server).get("/api/events");
    expect(response.status).toBe(200);
    console.log(response.body.events);
    console.log(defaultEventsArray);
    expect(String(response.body.events)).toEqual(String(defaultEventsArray));
  });

  test("POST: responds (201) and successfully updates table", async () => {
    const updatedEventsArray = defaultEventsArray;
    updatedEventsArray.push(newEvent);

    const response = await request(server).post("/api/events").send(newEvent);
    const updatedEventsData = await fetchTableData("events");

    const eventExists = updatedEventsData.some(
      (event) =>
        event.title === newEvent.title &&
        event.description === newEvent.description
    );

    expect(response.status).toBe(201);
    expect(response.body.message).toBe(
      `Event posted successfully: ${newEvent.title}`
    );
    expect(eventExists).toBe(true);
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
      const eventData = await fetchTableEntry("events", eventId);
      const response = await request(server).get(`/api/events/${eventId}`);
      expect(response.status).toBe(200);
      expect(String(response.body.event)).toEqual(String(eventData));
    });

    test("Event does not exist -> responds (404) Not Found", async () => {
      const eventId = 99999;
      const response = await request(server).get(`/api/events/${eventId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: `Event with ID ${eventId} not found.`,
      });
    });

    test("Invalid request format -> responds (400) Bad Request", async () => {
      const eventId = "invalid_event_id";
      const response = await request(server).get(`/api/events/${eventId}`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid event ID format.",
      });
    });
  });

  describe("DELETE", () => {
    test("Event exists -> responds (200) and successfully updates table", async () => {
      const eventId = 1;
      const response = await request(server).delete(`/api/events/${eventId}`);
      const eventsArray = await fetchTableData("events");
      const eventExists = eventsArray.some((event) => event.id === eventId);
      expect(response.status).toBe(200);
      expect(eventExists).toBe(false);
    });

    test("Event does not exist -> responds (404) Not Found", async () => {
      const eventId = 99999;
      const response = await request(server).delete(`/api/events/${eventId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: `Event with ID ${eventId} not found.`,
      });
    });

    test("Invalid request format -> responds (400) Bad Request", async () => {
      const eventId = "invalid_event_id";
      const response = await request(server).delete(`/api/events/${eventId}`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid event ID format.",
      });
    });
  });

  describe("POST", () => {
    test("POST: responds (405) Method Not Allowed", async () => {
      const eventId = 1;
      const response = await request(server).post(`/api/events/${eventId}`);
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: `POST Method Not Allowed on /api/events/${eventId}`,
      });
    });
  });

  describe("PUT", () => {
    test("PUT: responds (405) Method Not Allowed", async () => {
      const eventId = 1;
      const response = await request(server).put(`/api/events/${eventId}`);
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: `PUT Method Not Allowed on /api/events/${eventId}`,
      });
    });
  });

  describe("PATCH", () => {
    describe("Valid Request", () => {
      test("Event exists, valid property value -> responds (200) and successfully updates table", async () => {
        const eventId = 1,
          patchProperty = "title",
          patchValue = "new title";

        const oldEvent = await fetchTableEntry("events", eventId);
        const patchData = { [patchProperty]: patchValue };

        const response = await request(server)
          .patch(`/api/events/${eventId}`)
          .send(patchData);
        expect(response.status).toBe(200);
        const tableData = await fetchTableData("events");
        const eventData = tableData.find((event) => event.id === eventId);
        expect(eventData[patchProperty]).toBe(patchValue);
        expect(response.body).toEqual({
          message: `Event #${eventId} (${oldEvent.title}) updated ${patchProperty} to '${patchValue}' successfully.`,
        });
      });
    });

    describe("Invalid request", () => {
      test("Invalid patch format -> responds (400) Bad Request", async () => {
        const eventId = "1";
        let response = await request(server)
          .patch(`/api/events/${eventId}`)
          .send([{ tickets_sold: 3 }]);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch format.",
        });

        response = await request(server).patch(`/api/events/${eventId}`).send({
          "day_of_week": "Saturday",
          "time": "18:00:00",
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch format.",
        });
      });

      test("Invalid event ID format ->  responds (400) Bad Request", async () => {
        const eventId = "invalid_event_id";
        const response = await request(server).patch(`/api/events/${eventId}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid event ID format.",
        });
      });

      test("Event does not exist -> responds (404) Event Not Found", async () => {
        const eventId = 99999;
        const response = await request(server).patch(`/api/events/${eventId}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          error: `Event with ID ${eventId} not found.`,
        });
      });

      test("Property not exist -> responds (400) Bad Request", async () => {
        const eventId = 5,
          patchProperty = "invalid_property",
          patchValue = 3;

        const patchData = { [patchProperty]: patchValue };

        const response = await request(server)
          .patch(`/api/events/${eventId}`)
          .send(patchData);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Invalid property: ${patchProperty}.`,
        });
      });

      test("Invalid property value format -> responds (400) Bad Request", async () => {
        const eventId = 5,
          patchProperty = "tickets_sold",
          patchValue = "invalid_type_value";

        const patchData = { [patchProperty]: patchValue };

        let response = await request(server)
          .patch(`/api/events/${eventId}`)
          .send(patchData);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch value datatype.",
        });

        response = await request(server)
          .patch(`/api/events/${eventId}`)
          .send({ "date": "this is my favourite" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch value datatype.",
        });
      });

      test("Patch 'id' property -> responds (400) Request Not Allowed", async () => {
        const eventId = 5,
          patchProperty = "id",
          patchValue = 99999;

        const patchData = { [`${patchProperty}`]: patchValue };

        const response = await request(server)
          .patch(`/api/events/${eventId}`)
          .send(patchData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Request refused - Patching ID is disallowed.",
        });
      });
    });
  });
});
