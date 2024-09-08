const server = require("../../server");
const request = require("supertest");
const path = require("path");

const { getEndpointsData } = require("../utils.js");

beforeAll(async () => {
  expectedEndpoints = await getEndpointsData();
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
});
