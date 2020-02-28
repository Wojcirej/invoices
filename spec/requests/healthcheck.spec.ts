import { setUpTestServer, baseUrl } from "./../support/testServer";
import fetch from "node-fetch";

let server;

describe("Healthcheck router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /app_status", () => {
    const path = `${baseUrl}/app_status`;

    it("returns HTTP 200 status", async () => {
      const response = await fetch(path);
      const status = await response.status;
      expect(status).toEqual(200);
    });

    it("returns info about HTTP health", async () => {
      const response = await fetch(path);
      const body = await response.json();
      expect(body.status.http).toEqual("Healthy");
    });
  });
});
