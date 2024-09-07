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
        expect(response.text).toBe("Method Not Allowed");
      });
  });

  test("PUT: 405 should respond with 'Method Not Allowed'", () => {
    return request(server)
      .put("/api")
      .expect(405)
      .then((response) => {
        expect(response.text).toBe("Method Not Allowed");
      });
  });

  test("DELETE: 405 should respond with 'Method Not Allowed'", () => {
    return request(server)
      .delete("/api")
      .expect(405)
      .then((response) => {
        expect(response.text).toBe("Method Not Allowed");
      });
  });

  test("PATCH: 405 should respond with 'Method Not Allowed'", () => {
    return request(server)
      .patch("/api")
      .expect(405)
      .then((response) => {
        expect(response.text).toBe("Method Not Allowed");
      });
  });
});
