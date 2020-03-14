import { baseUrl, setUpTestServer } from "../../support/testServer";
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
    let response, status, responseBody;

    beforeAll(async () => {
      response = await fetch(path);
      status = await response.status;
      responseBody = await response.json();
    });

    it("returns HTTP 200 status", async () => {
      expect(status).toEqual(200);
    });

    it("returns info about HTTP health", async () => {
      expect(responseBody.status.http).toEqual("Healthy");
    });
  });
});
