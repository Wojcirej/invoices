import fetch from "node-fetch";

import { baseUrl, setUpTestServer } from "../../support/testServer";
import { invoicePayload } from "../../support/mocks/payloadSamples";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";

let server, response, status, responseBody;
const repository = new InvoiceRepository();

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

      beforeAll(async () => {
        response = await fetch(path, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        });
        status = await response.status;
        responseBody = await response.json();
      });

      it("responds with HTTP 201 status", () => {
        expect(status).toEqual(201);
      });

      it("responds with ID of the newly created Invoice", () => {
        expect(responseBody.id).toBeTruthy();
      });

      it("responds with status of the newly created Invoice", () => {
        expect(responseBody.status).toEqual("New");
      });

      it("responds with message for the end user", () => {
        expect(responseBody.message).toEqual("New Invoice has been created successfully.");
      });
    });
  });

  describe("GET /invoices/:id", () => {
    describe("when Invoice with requested ID exists", () => {
      const invoiceId = "0a0c0a14-c537-44bb-9716-5e181a47d977";
      const invoice = repository.find(invoiceId);
      const path = `${baseUrl}/invoices/${invoiceId}`;

      beforeAll(async () => {
        response = await fetch(path, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        status = await response.status;
        responseBody = await response.json();
      });

      it("responds with HTTP 200 status", () => {
        expect(status).toEqual(200);
      });

      it("responds with requested Invoice id", () => {
        expect(responseBody.id).toEqual(invoice.id);
      });

      it("responds with Invoice number as in requested Invoice", () => {
        expect(responseBody.invoiceNumber).toEqual(invoice.invoiceNumber);
      });

      it("responds with status in human readable way", () => {
        expect(responseBody.status).toBeInstanceOf(String);
        expect(responseBody.status).toEqual(invoice.getStatus());
      });

      it("responds with sale date represented as numerical timestamp", () => {
        expect(responseBody.saleDate).toBeInstanceOf(Number);
        expect(responseBody.saleDate).toEqual(new Date(invoice.saleDate).getTime());
      });

      it("responds with issue date represented as numerical timestamp", () => {
        expect(responseBody.issuedAt).toBeInstanceOf(Number);
        expect(responseBody.issuedAt).toEqual(new Date(invoice.issuedAt).getTime());
      });
    });

    describe("when Invoice with requested ID does not exist", () => {
      const invoiceId = "0";
      const path = `${baseUrl}/invoices/${invoiceId}`;

      beforeAll(async () => {
        response = await fetch(path, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        status = await response.status;
        responseBody = await response.json();
      });

      it("responds with HTTP 404 status", () => {
        expect(status).toEqual(404);
      });

      it("responds with message about Invoice not found", () => {
        expect(responseBody.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
      });
    });
  });
});
