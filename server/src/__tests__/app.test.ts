import request from "supertest";
import app from "./app"

describe("app tests", () => {
  it("GET / ROOT url", async () => {
    const result = await request(app.app).get("/");
    expect(result.statusCode).toEqual(404);
  });

  it("GET /random URL", async () => {
    const result = await request(app.app).get("/kenfzejhfboziejdapojzfoizejf");
    expect(result.statusCode).toEqual(404);
  });
});
