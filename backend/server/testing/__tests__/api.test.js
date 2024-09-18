const { server, db, request } = require("./index");
const { fetchEndpointsData } = require("../../../MVC/utils/data-utils");

let expectedEndpoints = {};

beforeAll(async () => {
  expectedEndpoints = await fetchEndpointsData();
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

  const methods = ["post", "put", "patch", "delete"];
  methods.forEach((method) => {
    test(`${method.toUpperCase()}: responds (405) Method Not Allowed`, async () => {
      const response = await request(server)[method]("/api");
      expect(response.status).toBe(405);
      expect(response.body).toEqual({
        error: `${method.toUpperCase()} Method Not Allowed on /api`,
      });
    });
  });
});

test("POST: responds (405) Method Not Allowed", async () => {
  const response = await request(server).post("/api");
  expect(response.status).toBe(405);
  expect(response.body).toEqual({ error: "POST Method Not Allowed on /api" });
});

test("PUT: responds (405) Method Not Allowed", async () => {
  const response = await request(server).put("/api");
  expect(response.status).toBe(405);
  expect(response.body).toEqual({ error: "PUT Method Not Allowed on /api" });
});

test("PATCH: responds (405) Method Not Allowed", async () => {
  const response = await request(server).patch("/api");
  expect(response.status).toBe(405);
  expect(response.body).toEqual({ error: "PATCH Method Not Allowed on /api" });
});

test("DELETE: responds (405) Method Not Allowed", async () => {
  const response = await request(server).delete("/api");
  expect(response.status).toBe(405);
  expect(response.body).toEqual({ error: "DELETE Method Not Allowed on /api" });
});
