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
  console.log("Seeded test table: users");
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
