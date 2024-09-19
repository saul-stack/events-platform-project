const {
  server,
  request,
  db,
  fetchTable,
  fetchTableEntry,
  seedTestTable,
  newEvent,
} = require("./index.js");

let defaultEventsArray = [];

beforeAll(async () => {
  await seedTestTable("events");
  defaultEventsArray = await fetchTable("events");
});

beforeEach(async () => {
  await seedTestTable("events");
});

afterAll(async () => {
  await db.end();
});

describe("/api/events", () => {
  describe("GET", () => {
    test("Responds (200) with expected JSON object", async () => {
      const response = await request(server).get("/api/events");
      expect(response.status).toBe(200);
      expect(String(response.body.events)).toEqual(String(defaultEventsArray));
    });
  });

  describe("DELETE", () => {
    test("Responds (405) Method Not Allowed", async () => {
      const response = await request(server).delete("/api/events");
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: "DELETE Method Not Allowed on /api/events",
      });
    });
  });

  describe("PUT", () => {
    test("Responds (405) Method Not Allowed", async () => {
      const response = await request(server).put("/api/events");
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: "PUT Method Not Allowed on /api/events",
      });
    });
  });

  describe("PATCH", () => {
    test("Responds (405) Method Not Allowed", async () => {
      const response = await request(server).patch("/api/events");
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: "PATCH Method Not Allowed on /api/events",
      });
    });
  });
});

describe("POST", () => {
  describe("Valid Request", () => {
    test("Responds (201) and successfully updates table", async () => {
      const updatedEventsArray = defaultEventsArray;
      updatedEventsArray.push(newEvent);

      const response = await request(server).post("/api/events").send(newEvent);
      const updatedEventsData = await fetchTable("events");

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
  });

  describe("Invalid Request", () => {
    test("Title already exists", async () => {
      const response = await request(server).post("/api/events").send({
        "title": "Test Event #2",
        "date": "2023-02-01",
        "time": "18:00:00",
        "description": "This is an event with a duplicate title.",
        "advance_price": 20.0,
        "door_price": 25.0,
        "tickets_total": 200,
        "tickets_sold": 100,
        "is_seated": false,
        "is_ticketed": true,
        "is_recurring": true,
        "image_url": "https://placehold.co/1920x1080",
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Event with this title already exists.",
      });
    });

    test("Available/sold tickets for non-ticketed event", async () => {
      let response = await request(server).post("/api/events").send({
        "title": "Invalid Event",
        "date": "2023-02-01",
        "time": "18:00:00",
        "description":
          "This is a non_ticketed event with tickets_total and tickets_sold of not 0.",
        "advance_price": 0,
        "door_price": 0,
        "tickets_total": 0,
        "tickets_sold": 1,
        "is_seated": false,
        "is_ticketed": false,
        "is_recurring": true,
        "image_url": "https://placehold.co/1920x1080",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Refused: Cannot post non-ticketed event with ticket values.",
      });

      response = await request(server).post("/api/events").send({
        "title": "Invalid Event",
        "date": "2023-02-01",
        "time": "18:00:00",
        "description": "This is a non_ticketed event with ticket prices.",
        "advance_price": 0,
        "door_price": 1,
        "tickets_total": 0,
        "tickets_sold": 0,
        "is_seated": false,
        "is_ticketed": false,
        "is_recurring": true,
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Refused: Cannot post non-ticketed event with ticket values.",
      });
    });

    describe("Negative tickets or prices", () => {
      test("Tickets", async () => {
        let response = await request(server).post("/api/events").send({
          "title": "A test",
          "date": "2023-01-01",
          "time": "12:00:00",
          "description": "This is the first test event.",
          "advance_price": 10.0,
          "door_price": 15.0,
          "tickets_total": -10,
          "tickets_sold": 50,
          "is_seated": true,
          "is_ticketed": true,
          "is_recurring": false,
          "image_url": "https://placehold.co/1920x1080",
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid ticket or price values.",
        });

        response = await request(server).post("/api/events").send({
          "title": "Another test",
          "date": "2023-01-01",
          "time": "12:00:00",
          "description": "This is the first test event.",
          "advance_price": 10.0,
          "door_price": 15.0,
          "tickets_total": 100,
          "tickets_sold": -20,
          "is_seated": true,
          "is_ticketed": true,
          "is_recurring": false,
          "image_url": "https://placehold.co/1920x1080",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid ticket or price values.",
        });
      });

      test("Prices", async () => {
        let response = await request(server).post("/api/events").send({
          "title": "Another test event",
          "date": "2023-01-01",
          "time": "12:00:00",
          "description": "This has negative advance_price.",
          "advance_price": -10.0,
          "door_price": 15.0,
          "tickets_total": 100,
          "tickets_sold": 50,
          "is_seated": true,
          "is_ticketed": true,
          "is_recurring": false,
          "image_url": "https://placehold.co/1920x1080",
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid ticket or price values.",
        });

        response = await request(server).post("/api/events").send({
          "title": "Another test for price",
          "date": "2023-01-01",
          "time": "12:00:00",
          "description": "This has negative door_price.",
          "advance_price": 10.0,
          "door_price": -15.0,
          "tickets_total": 100,
          "tickets_sold": 50,
          "is_seated": true,
          "is_ticketed": true,
          "is_recurring": false,
          "image_url": "https://placehold.co/1920x1080",
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid ticket or price values.",
        });
      });
    });
  });

  describe("/api/events/:id", () => {
    describe("GET", () => {
      describe("Valid Request", () => {
        test("Event exists: Responds (200) with expected JSON object", async () => {
          const eventId = 1;
          const eventData = await fetchTableEntry("events", eventId);
          const response = await request(server).get(`/api/events/${eventId}`);
          expect(response.status).toBe(200);
          expect(String(response.body.event)).toEqual(String(eventData));
        });
      });

      describe("Invalid Request", () => {
        test("Event does not exist: Responds (404) Not Found", async () => {
          const eventId = 99999;
          const response = await request(server).get(`/api/events/${eventId}`);
          expect(response.status).toBe(404);
          expect(response.body).toEqual({
            error: `Event with ID ${eventId} not found.`,
          });
        });

        test("Invalid request format: Responds (400) Bad Request", async () => {
          const eventId = "invalid_event_id";
          const response = await request(server).get(`/api/events/${eventId}`);
          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: "Invalid event ID format.",
          });
        });
      });
    });

    describe("DELETE", () => {
      describe("Valid Request", () => {
        test("Event exists: Responds (200) and successfully updates table", async () => {
          const eventId = 1;
          const response = await request(server).delete(
            `/api/events/${eventId}`
          );
          const eventsArray = await fetchTable("events");
          const eventExists = eventsArray.some((event) => event.id === eventId);
          expect(response.status).toBe(200);
          expect(eventExists).toBe(false);
        });
      });

      describe("Invalid Request", () => {
        test("Event does not exist: Responds (404) Not Found", async () => {
          const eventId = 99999;
          const response = await request(server).delete(
            `/api/events/${eventId}`
          );
          expect(response.status).toBe(404);
          expect(response.body).toEqual({
            error: `Event with ID ${eventId} not found.`,
          });
        });

        test("Invalid request format: Responds (400) Bad Request", async () => {
          const eventId = "invalid_event_id";
          const response = await request(server).delete(
            `/api/events/${eventId}`
          );
          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: "Invalid event ID format.",
          });
        });
      });
    });

    describe("POST", () => {
      test("Responds (405) Method Not Allowed", async () => {
        const eventId = 1;
        const response = await request(server).post(`/api/events/${eventId}`);
        expect(response.status).toBe(405);
        expect(response.body).toEqual({
          error: `POST Method Not Allowed on /api/events/${eventId}`,
        });
      });
    });

    describe("PUT", () => {
      test("Responds (405) Method Not Allowed", async () => {
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
        test("Event exists, valid property value Responds (200) and successfully updates table", async () => {
          const eventId = 1,
            patchProperty = "title",
            patchValue = "new title";

          const oldEvent = await fetchTableEntry("events", eventId);
          const patchData = { [patchProperty]: patchValue };

          const response = await request(server)
            .patch(`/api/events/${eventId}`)
            .send(patchData);
          expect(response.status).toBe(200);
          const tableData = await fetchTable("events");
          const eventData = tableData.find((event) => event.id === eventId);
          expect(eventData[patchProperty]).toBe(patchValue);
          expect(response.body).toEqual({
            message: `Event #${eventId} (${oldEvent.title}) updated ${patchProperty} to '${patchValue}' successfully.`,
          });
        });
      });

      describe("Invalid request", () => {
        test("Invalid patch format Responds (400) Bad Request", async () => {
          const eventId = "1";
          let response = await request(server)
            .patch(`/api/events/${eventId}`)
            .send([{ tickets_sold: 3 }]);
          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: "Invalid patch format.",
          });

          response = await request(server)
            .patch(`/api/events/${eventId}`)
            .send({
              "title": "failed patch",
              "time": "18:00:00",
            });
          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: "Invalid patch format.",
          });
        });

        test("Invalid event ID format Responds (400) Bad Request", async () => {
          const eventId = "invalid_event_id";
          const response = await request(server).patch(
            `/api/events/${eventId}`
          );
          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: "Invalid event ID format.",
          });
        });

        test("Event does not exist Responds (404) Event Not Found", async () => {
          const eventId = 99999;
          const response = await request(server).patch(
            `/api/events/${eventId}`
          );
          expect(response.status).toBe(404);
          expect(response.body).toEqual({
            error: `Event with ID ${eventId} not found.`,
          });
        });

        test("Property not exist Responds (400) Bad Request", async () => {
          const eventId = 1,
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

        test("Invalid property value format: Responds (400) Bad Request", async () => {
          const eventId = 2,
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

        test("Patch 'id' property: Responds (400) Request Not Allowed", async () => {
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
});
