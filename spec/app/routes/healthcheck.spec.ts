import { apiClient } from "../../support/lib";
import { validHeaders } from "../../support/validHeaders";
import { setUpTestServer } from "../../support/testServer";

let server, response;
const endpoint = "app_status";
const headers = validHeaders.contentType;

describe("Healthcheck router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /app_status", () => {
    beforeAll(async () => {
      response = await apiClient.makeGetRequest({ endpoint, headers });
    });

    it("returns HTTP 200 status", async () => {
      expect(response.responseStatus).toEqual(200);
    });

    it("returns info about HTTP health", async () => {
      expect(response.responseBody.status.http).toEqual("Healthy");
    });
  });
});
