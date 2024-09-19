const {
  server,
  request,
  db,
  fetchTable,
  fetchTableEntry,
  seedTestTable,
  newUser,
} = require("./index.js");

let defaultUsersArray = [];

beforeAll(async () => {
  await seedTestTable("events");
  await seedTestTable("users");
  defaultUsersArray = await fetchTable("users");
});

beforeEach(async () => {
  await seedTestTable("users");
});

afterAll(async () => {
  await seedTestTable("users");
  await db.end();
});

describe("/api/users", () => {
  describe("GET", () => {
    test("Responds (200) with all users", async () => {
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(200);
      expect(String(response.body.users)).toEqual(String(defaultUsersArray));
    });
  });

  describe("DELETE", () => {
    test("Responds (405) Not Allowed", async () => {
      const response = await request(server).delete("/api/users");
      expect(response.status).toBe(405);
      expect(response.body.error).toBe(
        "DELETE Method Not Allowed on /api/users"
      );
    });
  });

  describe("PUT", () => {
    test("Responds (405) Not Allowed", async () => {
      const response = await request(server).put("/api/users");
      expect(response.status).toBe(405);
      expect(response.body.error).toBe("PUT Method Not Allowed on /api/users");
    });
  });
  describe("PATCH", () => {
    test("responds (405) Not Allowed", async () => {
      const response = await request(server).patch("/api/users");
      expect(response.status).toBe(405);
      expect(response.body.error).toBe(
        "PATCH Method Not Allowed on /api/users"
      );
    });
  });

  describe("POST", () => {
    describe("Valid request", () => {
      test("Responds (201) and successfully updates table", async () => {
        const updatedUsersArray = defaultUsersArray;
        updatedUsersArray.push(newUser);

        const response = await request(server).post("/api/users").send(newUser);
        const updatedUsersData = await fetchTable("users");

        const userExists = updatedUsersData.some(
          (user) =>
            user.title === newUser.title &&
            user.description === newUser.description
        );

        expect(response.status).toBe(201);
        expect(response.body.message).toBe(
          `User posted successfully: ${newUser.title}`
        );
        expect(userExists).toBe(true);
      });
    });

    describe("Invalid request", () => {
      test("Attempt to post user with non-existant event ids", async () => {
        let response = await request(server)
          .post("/api/users")
          .send({
            "first_name": "Lewis",
            "last_name": "Stephens",
            "user_name": "Lewie21",
            "events_watched": [1, 9999],
            "events_booked": [2],
            "email": "lewie-is-cool@email.com",
            "password": "password",
            "role": "user",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Refused: events_watched contains non-existant event ids.`,
        });
      });

      test("Attempt to post user with duplicate events", async () => {
        let response = await request(server)
          .post("/api/users")
          .send({
            "first_name": "David",
            "last_name": "Jones",
            "user_name": "d.jones1",
            "events_watched": [1, 1],
            "events_booked": [2],
            "email": "davey21@email.com",
            "password": "password",
            "role": "user",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Refused: Duplicate Events Values.`,
        });
        response = await request(server)
          .post("/api/users")
          .send({
            "first_name": "David",
            "last_name": "Jones",
            "user_name": "d.jones1",
            "events_watched": [1],
            "events_booked": [2, 2],
            "email": "davey21@email.com",
            "password": "password",
            "role": "user",
          });
        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Refused: Duplicate Events Values.`,
        });
      });

      test("Invalid request format: Responds (400) Bad Request", async () => {
        let response = await request(server).post("/api/users").send({
          "first_name": "Generic",
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Invalid Request Format.`,
        });

        response = await request(server).post("/api/users").send({
          "first_name": "Andy",
          "last_name": "Carrington",
          "user_name": "andy_carrington21",
          "events_watched": "[2]",
          "events_booked": "[1]",
          "email": "a.carrington21@email.com",
          "role": "user",
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Invalid Request Format.`,
        });
      });

      test("Email taken: Responds (400) Bad Request", async () => {
        const response = await request(server)
          .post("/api/users")
          .send({
            "first_name": "Unique",
            "last_name": "User",
            "user_name": "unique_user21",
            "events_watched": [1, 2, 3],
            "events_booked": [1],
            "email": "generic@email.com",
            "password": "password",
            "role": "user",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "User with this email address already exists.",
        });
      });

      test("Username taken: Responds (400) Bad Request", async () => {
        const response = await request(server)
          .post("/api/users")
          .send({
            "first_name": "Unique",
            "last_name": "User",
            "user_name": "generic_user",
            "events_watched": [1, 2, 3],
            "events_booked": [1],
            "email": "unique-email-address@email.com",
            "password": "password",
            "role": "user",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "User with this username already exists.",
        });
      });
    });
  });
});

describe("/api/users/:id", () => {
  describe("GET", () => {
    describe("Valid request", () => {
      test("Responds (200) with user object", async () => {
        const userId = 1;
        const response = await request(server).get(`/api/users/${userId}`);
        const expectedUser = await fetchTableEntry("users", userId);
        expect(response.status).toBe(200);
        expect(response.body.user).toEqual(expectedUser);
      });
    });

    describe("Invalid request", () => {
      test("User does not exist: Responds (404) Not Found", async () => {
        const userId = 99999;
        const response = await request(server).get(`/api/users/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          error: `User not found.`,
        });
      });

      test("Invalid request format: Responds (400) Bad Request", async () => {
        const userId = "invalid_user_id";
        const response = await request(server).get(`/api/users/${userId}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid user ID format.",
        });
      });
    });
  });

  describe("DELETE", () => {
    describe("Valid request", () => {
      test("Responds (200) and successfully updates table", async () => {
        const userId = 1;
        const response = await request(server).delete(`/api/users/${userId}`);
        const usersArray = await fetchTable("users");
        const userExists = usersArray.some((user) => user.id === userId);
        expect(response.status).toBe(200);
        expect(userExists).toBe(false);
      });
    });

    describe("Invalid request", () => {
      test("User does not exist: Responds (404) Not Found", async () => {
        const userId = 99999;
        const response = await request(server).delete(`/api/users/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          error: `User with ID ${userId} not found.`,
        });
      });

      test("Invalid request format: Responds (400) Bad Request", async () => {
        const eventId = "invalid_event_id";
        const response = await request(server).delete(`/api/events/${eventId}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid event ID format.",
        });
      });
    });
  });

  describe("POST", () => {
    test("Responds (405) Method Not Allowed", async () => {
      const userId = 1;
      const response = await request(server).post(`/api/users/${userId}`);
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: `POST Method Not Allowed on /api/users/${userId}`,
      });
    });
  });

  describe("PUT", () => {
    test("Responds (405) Method Not Allowed", async () => {
      const userId = 1;
      const response = await request(server).put(`/api/users/${userId}`);
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: `PUT Method Not Allowed on /api/users/${userId}`,
      });
    });
  });

  describe("PATCH", () => {
    describe("Valid Request", () => {
      test("Responds (200) and successfully updates table", async () => {
        const userId = 1,
          patchProperty = "email",
          patchValue = "new-address@email.com";

        const oldUser = await fetchTableEntry("users", userId);
        const patchData = { [patchProperty]: patchValue };

        const response = await request(server)
          .patch(`/api/users/${userId}`)
          .send(patchData);
        expect(response.status).toBe(200);
        const tableData = await fetchTable("users");
        const userData = tableData.find((user) => user.id === userId);
        expect(userData[patchProperty]).toBe(patchValue);
        expect(response.body).toEqual({
          message: `User #${userId} (${oldUser.user_name}) updated ${patchProperty} to '${patchValue}' successfully.`,
        });
      });
    });

    describe("Invalid request", () => {
      test("Attempting to patch user with non-existant event ids", async () => {
        const userId = 1;
        const eventId = 99999;
        let response = await request(server)
          .patch(`/api/users/${userId}`)
          .send({ events_watched: [1, 2, 3, 99999] });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Refused: events_watched contains non-existant event ids.`,
        });

        response = await request(server)
          .patch(`/api/users/${userId}`)
          .send({ events_booked: [1, 2, 3, 99999] });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Refused: events_booked contains non-existant event ids.`,
        });
      });

      test("Attempting to patch user with duplicate events_booked or events_watched.", async () => {
        const userId = 1;

        const response = await request(server)
          .patch(`/api/users/${userId}`)
          .send({ events_booked: [1, 1, 2] });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Refused: Duplicate Events Values.`,
        });
      });

      test("Email taken: Responds (400) Bad Request", async () => {
        const userId = 1,
          patchProperty = "email",
          patchValue = "generic@email.com";

        const patchData = { [patchProperty]: patchValue };

        const response = await request(server)
          .patch(`/api/users/${userId}`)
          .send(patchData);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "User with this email address already exists.",
        });
      });
      test("Username taken: Responds (400) Bad Request", async () => {
        const userId = 1,
          patchProperty = "user_name",
          patchValue = "generic_user";

        const patchData = { [patchProperty]: patchValue };

        const response = await request(server)
          .patch(`/api/users/${userId}`)
          .send(patchData);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "User with this username already exists.",
        });
      });

      test("Invalid patch format: Responds (400) Bad Request", async () => {
        const userId = "1";
        let response = await request(server)
          .patch(`/api/users/${userId}`)
          .send([{ user_name: "jeff" }]);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch format.",
        });

        response = await request(server).patch(`/api/users/${userId}`).send({
          "email": "new-address@email.com",
          "password": "password9999",
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch format.",
        });
      });

      test("Invalid user ID format: Responds (400) Bad Request", async () => {
        const userId = "invalid_user_id";
        const response = await request(server).patch(`/api/users/${userId}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid user ID format.",
        });
      });

      test("User does not exist: Responds (404) Not Found", async () => {
        const userId = 99999;
        const response = await request(server).patch(`/api/users/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          error: `User not found.`,
        });
      });

      test("Property not exist: Responds (400) Bad Request", async () => {
        const userId = 2,
          patchProperty = "invalid_property",
          patchValue = "new value";

        const patchData = { [patchProperty]: patchValue };

        const response = await request(server)
          .patch(`/api/users/${userId}`)
          .send(patchData);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: `Invalid property: ${patchProperty}.`,
        });
      });

      test("Invalid property value format: Responds (400) Bad Request", async () => {
        const userId = 1;
        let response = await request(server)
          .patch(`/api/users/${userId}`)
          .send({ "events_watched": "not_an_array" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch value datatype.",
        });
      });

      test("Invalid email address format: Responds (400) Bad Request", async () => {
        const userId = 1;
        let response = await request(server)
          .patch(`/api/users/${userId}`)
          .send({ "email": "invalid_email_address" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid email address.",
        });
      });

      test("Attempt patch 'id' property: Responds (400) Bad Request", async () => {
        const userId = 2,
          patchProperty = "id",
          patchValue = 99999;

        const patchData = { [`${patchProperty}`]: patchValue };

        const response = await request(server)
          .patch(`/api/events/${userId}`)
          .send(patchData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Request refused - Patching ID is disallowed.",
        });
      });
    });
  });
});

//post and patch should abide by rules of psql value types -
//dont allow duplicate events titles
//minimum/maximum length of each entry in the table
