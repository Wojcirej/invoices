import { setUpTestServer, baseUrl } from "./../../support/testServer";
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

        it("responds with HTTP 404 status", async () => {
          const response = await fetch(path, { method: method });
          const status = await response.status;
          expect(status).toEqual(404);
        });

        it("responds with application name", async () => {
          const response = await fetch(path, { method: method });
          const body = await response.json();
          expect(body.application).toEqual("Invoices API");
        });

        it("responds with message about page not found", async () => {
          const response = await fetch(path, { method: method });
          const body = await response.json();
          expect(body.message).toEqual("The page you're looking for doesn't exist.");
        });
      });
    });
  });
});
