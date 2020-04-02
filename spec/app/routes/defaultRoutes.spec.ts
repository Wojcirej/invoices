import { setUpTestServer } from "../../support/testServer";
import { validHeaders } from "../../support/validHeaders";
import { itBehavesLikeEndpointEnforcingContentTypeJson } from "../../support/sharedExamples";
import { apiClient } from "../../support/lib";

const supportedMethods = ["Post", "Put", "Patch", "Delete"];
const headers = validHeaders.contentType;
const endpoint = "not_specified";
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
      let response;

      beforeAll(async () => {
        response = await apiClient.makeGetRequest({ endpoint, headers });
      });

      it("responds with HTTP 404 status", async () => {
        expect(response.responseStatus).toEqual(404);
      });

      it("responds with application name", async () => {
        expect(response.responseBody.application).toEqual("Invoices API");
      });

      it("responds with message about page not found", async () => {
        expect(response.responseBody.message).toEqual("The page you're looking for doesn't exist.");
      });
    });
  });

  supportedMethods.forEach(method => {
    describe(`${method.toUpperCase()} /not_specified`, () => {
      itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, method);

      describe("when not specified route is requested", () => {
        let response;

        beforeAll(async () => {
          response = await apiClient[`make${method}Request`]({ endpoint, headers });
        });

        it("responds with HTTP 404 status", async () => {
          expect(response.responseStatus).toEqual(404);
        });

        it("responds with application name", async () => {
          expect(response.responseBody.application).toEqual("Invoices API");
        });

        it("responds with message about page not found", async () => {
          expect(response.responseBody.message).toEqual("The page you're looking for doesn't exist.");
        });
      });
    });
  });
});
