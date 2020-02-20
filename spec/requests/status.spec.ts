import { setUpTestServer, baseUrl } from "./../support/testServer";
import request from "request";

let server;

describe("Healthcheck router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /status", () => {
    const path = `${baseUrl}/status`;

    it("returns HTTP 200 status", done => {
      request.get(path, (error, response, body) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
    });

    it("returns info about HTTP health", done => {
      request.get(path, (error, response, body) => {
        expect(JSON.parse(body).status.http).toEqual("Healthy");
        done();
      });
    });
  });
});
