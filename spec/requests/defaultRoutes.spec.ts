import { setUpTestServer, baseUrl } from "./../support/testServer";
import request from "request";

const supportedMethods = ["get", "post", "put", "patch", "delete"];
let server;

describe("Default router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  supportedMethods.forEach(method => {
    describe(`${method.toUpperCase()} /not_specified`, () => {
      describe("when not specified route is requested", () => {
        const path = `${baseUrl}/not_specified`;

        it("responds with HTTP 404 status", done => {
          request[method](path, (error, response, body) => {
            expect(response.statusCode).toEqual(404);
            done();
          });
        });

        it("responds with application name", done => {
          request[method](path, (error, response, body) => {
            expect(JSON.parse(body).application).toEqual("Invoices API");
            done();
          });
        });

        it("responds with message about page not found", done => {
          request[method](path, (error, response, body) => {
            expect(JSON.parse(body).message).toEqual("The page you're looking for doesn't exist.");
            done();
          });
        });
      });
    });
  });
});
