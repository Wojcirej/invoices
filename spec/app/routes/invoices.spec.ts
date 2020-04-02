import { apiClient } from "../../support/lib";
import { validHeaders } from "../../support/validHeaders";

import { setUpTestServer } from "../../support/testServer";
import { invoicePayload } from "../../support/mocks/payloadSamples";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { InvoiceFactory } from "../../../domain/Invoices/factories/InvoiceFactory";
import InvoiceStatuses from "../../../domain/Invoices/lib/InvoiceStatuses";
import { itBehavesLikeEndpointEnforcingContentTypeJson } from "../../support/sharedExamples";

let server, response;
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
    const endpoint = "invoices/new";

    itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, "Post");

    describe("when valid request", () => {
      const data = invoicePayload;

      beforeAll(async () => {
        response = await apiClient.makePostRequest({ endpoint, headers, requestBody: data });
      });

      it("responds with HTTP 201 status", () => {
        expect(response.responseStatus).toEqual(201);
      });

      it("responds with ID of the newly created Invoice", () => {
        expect(response.responseBody.id).toBeTruthy();
      });

      it("responds with status of the newly created Invoice", () => {
        expect(response.responseBody.status).toEqual("New");
      });

      it("responds with message for the end user", () => {
        expect(response.responseBody.message).toEqual("New Invoice has been created successfully.");
      });
    });
  });

  describe("GET /invoices/:id", () => {
    describe("when Invoice with requested ID exists", () => {
      const invoice = InvoiceFactory.buildInDb(invoicePayload, repository);
      const endpoint = `invoices/${invoice.id}`;

      beforeAll(async () => {
        response = await apiClient.makeGetRequest({ endpoint, headers });
      });

      it("responds with HTTP 200 status", () => {
        expect(response.responseStatus).toEqual(200);
      });

      it("responds with requested Invoice id", () => {
        expect(response.responseBody.id).toEqual(invoice.id);
      });

      it("responds with Invoice number as in requested Invoice", () => {
        expect(response.responseBody.invoiceNumber).toEqual(invoice.invoiceNumber);
      });

      it("responds with status in human readable way", () => {
        expect(response.responseBody.status).toBeInstanceOf(String);
        expect(response.responseBody.status).toEqual(invoice.getStatus());
      });

      it("responds with sale date represented as numerical timestamp", () => {
        expect(response.responseBody.saleDate).toBeInstanceOf(Number);
        expect(response.responseBody.saleDate).toEqual(new Date(invoice.saleDate).getTime());
      });

      it("responds with issue date represented as numerical timestamp", () => {
        expect(response.responseBody.issuedAt).toBeInstanceOf(Number);
        expect(response.responseBody.issuedAt).toEqual(new Date(invoice.issuedAt).getTime());
      });
    });

    describe("when Invoice with requested ID does not exist", () => {
      const invoiceId = "0";
      const endpoint = `invoices/${invoiceId}`;

      beforeAll(async () => {
        response = await apiClient.makeGetRequest({ endpoint, headers });
      });

      it("responds with HTTP 404 status", () => {
        expect(response.responseStatus).toEqual(404);
      });

      it("responds with message about Invoice not found", () => {
        expect(response.responseBody.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
      });
    });
  });

  describe("GET /invoices", () => {
    const endpoint = "invoices";

    beforeAll(async () => {
      response = await apiClient.makeGetRequest({ endpoint, headers });
    });

    it("responds with HTTP 200 status", () => {
      expect(response.responseStatus).toEqual(200);
    });

    it("responds with list of all existing Invoices", () => {
      const expectedInvoiceIds = repository.findAll().map(invoice => invoice.id);
      const receivedInvoiceIds = response.responseBody.map(invoice => invoice.id);
      expect(expectedInvoiceIds).toEqual(receivedInvoiceIds);
    });
  });

  describe("PATCH /invoices/:id", () => {
    describe("when Invoice with requested ID exists", () => {
      describe("when Invoice can be edited", () => {
        const data = Object.assign({}, invoicePayload);
        data.invoice.status = InvoiceStatuses.New;
        const invoice = InvoiceFactory.buildInDb(data, new InvoiceRepository());
        const endpoint = `invoices/${invoice.id}`;

        itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, "Patch");

        beforeAll(async () => {
          response = await apiClient.makePatchRequest({ endpoint, headers, requestBody: data });
        });

        it("responds with HTTP 200 status", () => {
          expect(response.responseStatus).toEqual(200);
        });

        it("responds with requested Invoice id", () => {
          expect(response.responseBody.id).toEqual(invoice.id);
        });
      });

      describe("when Invoice cannot be edited", () => {
        const data = Object.assign({}, invoicePayload);
        data.invoice.status = InvoiceStatuses.Verified;
        const invoice = InvoiceFactory.buildInDb(data, new InvoiceRepository());
        const endpoint = `invoices/${invoice.id}`;

        beforeAll(async () => {
          response = await apiClient.makePatchRequest({ endpoint, headers, requestBody: data });
        });

        it("responds with HTTP 422 status", () => {
          expect(response.responseStatus).toEqual(422);
        });

        it("responds with message about Invoice not possible to be edited", () => {
          expect(response.responseBody.message).toEqual(
            `Invoice with ID ${invoice.id} cannot be edited - it's already Verified and only new Invoices can be edited.`
          );
        });
      });
    });

    describe("when Invoice with requested ID does not exist", () => {
      const invoiceId = "0";
      const endpoint = `invoices/${invoiceId}`;

      beforeAll(async () => {
        response = await apiClient.makePatchRequest({ endpoint, headers });
      });

      it("responds with HTTP 404 status", () => {
        expect(response.responseStatus).toEqual(404);
      });

      it("responds with message about Invoice not found", () => {
        expect(response.responseBody.message).toEqual(`Invoice with id ${invoiceId} does not exist.`);
      });
    });
  });
});
