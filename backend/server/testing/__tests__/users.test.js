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
  await seedTestTable("users");
  defaultUsersArray = await fetchTable("users");
});

beforeEach(async () => {
  await seedTestTable("users");
});

afterAll(async () => {
  await db.end();
});

describe("/api/users", () => {
  test("GET: responds (200) with expected JSON object", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toBe(200);
    expect(String(response.body.users)).toEqual(String(defaultUsersArray));
  });

  test("DELETE: responds (405) with error message", async () => {
    const response = await request(server).delete("/api/users");
    expect(response.status).toBe(405);
    expect(response.body.error).toBe("DELETE Method Not Allowed on /api/users");
  });

  test("PUT: responds (405) with error message", async () => {
    const response = await request(server).put("/api/users");
    expect(response.status).toBe(405);
    expect(response.body.error).toBe("PUT Method Not Allowed on /api/users");
  });

  test("PATCH: responds (405) with error message", async () => {
    const response = await request(server).patch("/api/users");
    expect(response.status).toBe(405);
    expect(response.body.error).toBe("PATCH Method Not Allowed on /api/users");
  });

  test("POST: responds (201) and successfully updates table", async () => {
    const updatedUsersArray = defaultUsersArray;
    updatedUsersArray.push(newUser);

    const response = await request(server).post("/api/users").send(newUser);
    const updatedUsersData = await fetchTable("users");

    const userExists = updatedUsersData.some(
      (user) =>
        user.title === newUser.title && user.description === newUser.description
    );

    expect(response.status).toBe(201);
    expect(response.body.message).toBe(
      `User posted successfully: ${newUser.title}`
    );
    expect(userExists).toBe(true);
  });
});

describe("/api/users/:id", () => {
  describe("GET", () => {
    test("User exists -> responds (200) with expected JSON object", async () => {
      const userId = 1;
      const response = await request(server).get(`/api/users/${userId}`);
      const expectedUser = await fetchTableEntry("users", userId);

      expect(response.status).toBe(200);
      expect(response.body.user).toEqual(expectedUser);
    });

    test("User does not exist -> responds (404) Not Found", async () => {
      const userId = 99999;
      const response = await request(server).get(`/api/users/${userId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: `User with ID ${userId} not found.`,
      });
    });

    test("Invalid request format -> responds (400) Bad Request", async () => {
      const userId = "invalid_user_id";
      const response = await request(server).get(`/api/users/${userId}`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid user ID format.",
      });
    });
  });

  describe("DELETE", () => {
    test("User exists -> responds (200) and successfully updates table", async () => {
      const userId = 1;
      const response = await request(server).delete(`/api/users/${userId}`);
      const usersArray = await fetchTable("users");
      const userExists = usersArray.some((user) => user.id === userId);
      expect(response.status).toBe(200);
      expect(userExists).toBe(false);
    });

    test("User does not exist -> responds (404) Not Found", async () => {
      const userId = 99999;
      const response = await request(server).delete(`/api/users/${userId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: `User with ID ${userId} not found.`,
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
      const userId = 1;
      const response = await request(server).post(`/api/users/${userId}`);
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: `POST Method Not Allowed on /api/users/${userId}`,
      });
    });
  });

  describe("PUT", () => {
    test("PUT: responds (405) Method Not Allowed", async () => {
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
      test("User exists, valid property value -> responds (200) and successfully updates table", async () => {
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
      test("Invalid patch format -> responds (400) Bad Request", async () => {
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

      test("Invalid user ID format ->  responds (400) Bad Request", async () => {
        const userId = "invalid_user_id";
        const response = await request(server).patch(`/api/users/${userId}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid user ID format.",
        });
      });

      test("User does not exist -> responds (404) User Not Found", async () => {
        const userId = 99999;
        const response = await request(server).patch(`/api/users/${userId}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
          error: `User with ID ${userId} not found.`,
        });
      });

      test("Property not exist -> responds (400) Bad Request", async () => {
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

      test("Invalid property value format -> responds (400) Bad Request", async () => {
        const userId = 1;
        let response = await request(server)
          .patch(`/api/users/${userId}`)
          .send({ "events_watched": "not_an_array" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid patch value datatype.",
        });
      });

      test("Invalid email address -> responds (400) Bad Request", async () => {
        const userId = 1;
        let response = await request(server)
          .patch(`/api/users/${userId}`)
          .send({ "email": "invalid_email_address" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Invalid email address.",
        });
      });

      test("Patch 'id' property -> responds (400) Request Not Allowed", async () => {
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

//post shouldn't allow duplicate email addresses or user_names
