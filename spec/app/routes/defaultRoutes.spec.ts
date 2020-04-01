import { baseUrl, setUpTestServer } from "../../support/testServer";
import fetch from "node-fetch";

const supportedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
let server;

describe("Default router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  supportedMethods.forEach(method => {
    describe(`${method} /not_specified`, () => {
      describe("when not specified route is requested", () => {
        const path = `${baseUrl}/not_specified`;
        let response, status, responseBody;

        beforeAll(async () => {
          response = await fetch(path, { method: method });
          status = await response.status;
          responseBody = await response.json();
        });

        it("responds with HTTP 404 status", async () => {
          expect(status).toEqual(404);
        });

        it("responds with application name", async () => {
          expect(responseBody.application).toEqual("Invoices API");
        });

        it("responds with message about page not found", async () => {
          expect(responseBody.message).toEqual("The page you're looking for doesn't exist.");
        });
      });
    });
  });
});
