import fetch from "node-fetch";

import { baseUrl, setUpTestServer } from "../../support/testServer";
import { invoicePayload } from "../../support/mocks/payloadSamples";

let server;

describe("Invoices router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /invoices/new", () => {
    const path = `${baseUrl}/invoices/new`;

    describe("when valid request", () => {
      const data = invoicePayload;
      let response, status, responseBody;

      beforeAll(async () => {
        response = await fetch(path, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        });
        status = await response.status;
        responseBody = await response.json();
      });

      it("responds with HTTP 201 status", async () => {
        expect(status).toEqual(201);
      });

      it("responds with ID of the newly created Invoice", async () => {
        expect(responseBody.id).toBeTruthy();
      });

      it("responds with status of the newly created Invoice", async () => {
        expect(responseBody.status).toEqual("New");
      });

      it("responds with message for the end user", async () => {
        expect(responseBody.message).toEqual("New Invoice has been created successfully.");
      });
    });
  });
});
