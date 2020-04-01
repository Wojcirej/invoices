import fetch from "node-fetch";

import { baseUrl, setUpTestServer } from "../../support/testServer";
import { invoicePayload } from "../../support/mocks/payloadSamples";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { InvoiceFactory } from "../../../domain/Invoices/factories/InvoiceFactory";
import InvoiceStatuses from "../../../domain/Invoices/lib/InvoiceStatuses";
import { itBehavesLikeEndpointEnforcingContentTypeJson } from "../../support/sharedExamples";
import { validHeaders } from "../../support/validHeaders";

let server, response, status, responseBody;
const repository = new InvoiceRepository();
const headers = validHeaders.contentType;

describe("Invoices router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /invoices/new", () => {
    const path = `${baseUrl}/invoices/new`;

    describe("it behaves like endpoint enforcing content type JSON", () => {
      describe("when Content-Type header is NOT set to application/json", () => {
        beforeAll(async () => {
          response = await fetch(path, {
            method: "POST",
            headers: { "Content-Type": "application/pdf" }
          });
          status = await response.status;
          responseBody = await response.json();
        });

        it("responds with HTTP 415 status", () => {
          expect(status).toEqual(415);
        });

        it("responds with message about not supported media type", () => {
          expect(responseBody.message).toEqual(
            "Unsupported media type - please make sure you have set 'Content-Type' header to 'application/json'."
          );
        });
      });
    });

    describe("when valid request", () => {
      const data = invoicePayload;

      beforeAll(async () => {
        response = await fetch(path, {
          method: "POST",
          body: JSON.stringify(data),
          headers
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
      const invoice = InvoiceFactory.buildInDb(invoicePayload, repository);
      const path = `${baseUrl}/invoices/${invoice.id}`;

      beforeAll(async () => {
        response = await fetch(path, {
          method: "GET",
          headers
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
          headers
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

  describe("GET /invoices", () => {
    const path = `${baseUrl}/invoices/`;

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

    it("responds with list of all existing Invoices", () => {
      const expectedInvoiceIds = repository.findAll().map(invoice => invoice.id);
      const receivedInvoiceIds = responseBody.map(invoice => invoice.id);
      expect(expectedInvoiceIds).toEqual(receivedInvoiceIds);
    });
  });

  describe("PATCH /invoices/:id", () => {
    describe("when Invoice with requested ID exists", () => {
      describe("when Invoice can be edited", () => {
        const data = Object.assign({}, invoicePayload);
        data.invoice.status = InvoiceStatuses.New;
        const invoice = InvoiceFactory.buildInDb(data, new InvoiceRepository());
        const path = `${baseUrl}/invoices/${invoice.id}`;

        itBehavesLikeEndpointEnforcingContentTypeJson(path, "PATCH");

        beforeAll(async () => {
          response = await fetch(path, {
            method: "PATCH",
            headers,
            body: JSON.stringify({})
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
      });

      describe("when Invoice cannot be edited", () => {
        const data = Object.assign({}, invoicePayload);
        data.invoice.status = InvoiceStatuses.Verified;
        const invoice = InvoiceFactory.buildInDb(data, new InvoiceRepository());
        const path = `${baseUrl}/invoices/${invoice.id}`;

        beforeAll(async () => {
          response = await fetch(path, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
          });
          status = await response.status;
          responseBody = await response.json();
        });

        it("responds with HTTP 422 status", () => {
          expect(status).toEqual(422);
        });

        it("responds with message about Invoice not possible to be edited", () => {
          expect(responseBody.message).toEqual(
            `Invoice with ID ${invoice.id} cannot be edited - it's already Verified and only new Invoices can be edited.`
          );
        });
      });
    });

    describe("when Invoice with requested ID does not exist", () => {
      const invoiceId = "0";
      const path = `${baseUrl}/invoices/${invoiceId}`;

      beforeAll(async () => {
        response = await fetch(path, {
          method: "PATCH",
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
