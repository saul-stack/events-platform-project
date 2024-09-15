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
});
