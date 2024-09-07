const server = require("../server");
const request = require("supertest");

describe("/api", () => {
  test("GET: 200 should respond with a JSON object", () => {
    return request(server)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });

  test("POST: 405 should respond with 'Method Not Allowed'", () => {
    return request(server)
      .post("/api")
      .expect(405)
      .then((response) => {
        expect(response.body).toEqual({
          error: "POST Method Not Allowed on /api",
        });
      });
  });

  test("PUT: 405 should respond with 'Method Not Allowed'", () => {
    return request(server)
      .put("/api")
      .expect(405)
      .then((response) => {
        expect(response.body).toEqual({
          error: "PUT Method Not Allowed on /api",
        });
      });
  });

  test("DELETE: 405 should respond with 'Method Not Allowed'", () => {
    return request(server)
      .delete("/api")
      .expect(405)
      .then((response) => {
        expect(response.body).toEqual({
          error: "DELETE Method Not Allowed on /api",
        });
      });
  });

  test("PATCH: 405 should respond with 'Method Not Allowed'", () => {
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
