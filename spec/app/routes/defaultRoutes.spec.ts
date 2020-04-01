import { baseUrl, setUpTestServer } from "../../support/testServer";
import fetch from "node-fetch";
import { validHeaders } from "../../support/validHeaders";
import { itBehavesLikeEndpointEnforcingContentTypeJson } from "../../support/sharedExamples";

const supportedMethods = ["POST", "PUT", "PATCH", "DELETE"];
const headers = validHeaders.contentType;
const path = `${baseUrl}/not_specified`;
let server;

describe("Default router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /not_specified", () => {
    describe("when not specified route is requested", () => {
      let response, status, responseBody;

      beforeAll(async () => {
        response = await fetch(path, { method: "GET", headers });
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

  supportedMethods.forEach(method => {
    describe(`${method} /not_specified`, () => {
      itBehavesLikeEndpointEnforcingContentTypeJson(path, method);
      describe("when not specified route is requested", () => {
        let response, status, responseBody;

        beforeAll(async () => {
          response = await fetch(path, { method: method, headers });
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
