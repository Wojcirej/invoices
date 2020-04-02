import { apiClient } from "../../support/lib";
import { validHeaders } from "../../support/validHeaders";

import { setUpTestServer } from "../../support/testServer";
import { itBehavesLikeEndpointEnforcingContentTypeJson } from "../../support/sharedExamples";
import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { InvoiceFactory } from "../../../domain/Invoices/factories/InvoiceFactory";
import { invoicePayload } from "../../support/mocks/payloadSamples";
import { CompanyFactory } from "../../../domain/Companies/CompanyFactory";

let server, response;
const repository = new CompanyRepository();
const headers = validHeaders.contentType;

describe("Companies router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /companies/:id", () => {
    describe("when Company with requested ID exists", () => {
      const company = CompanyFactory.build();
      repository.save(company);
      const endpoint = `companies/${company.id}`;

      beforeAll(async () => {
        response = await apiClient.makeGetRequest({ endpoint, headers });
      });

      afterAll(() => {
        repository.destroy(company.id);
      });

      it("responds with HTTP 200 status", () => {
        expect(response.responseStatus).toEqual(200);
      });

      it("responds with requested Company id", () => {
        expect(response.responseBody.id).toEqual(company.id);
      });

      it("returns details of the requested Company", () => {
        expect(response.responseBody.name).toEqual(company.name);
        expect(response.responseBody.address).toEqual(company.address);
        expect(response.responseBody.taxPayerNumber).toEqual(company.taxPayerNumber);
        expect(response.responseBody.email).toEqual(company.email);
        expect(response.responseBody.telephone).toEqual(company.telephone);
        expect(response.responseBody.website).toEqual(company.website);
      });
    });

    describe("when Company with requested ID does not exist", () => {
      const invoiceId = "0";
      const endpoint = `companies/${invoiceId}`;

      beforeAll(async () => {
        response = await apiClient.makeGetRequest({ endpoint, headers });
      });

      it("responds with HTTP 404 status", () => {
        expect(response.responseStatus).toEqual(404);
      });

      it("responds with message about Company not found", () => {
        expect(response.responseBody.message).toEqual(`Company with id ${invoiceId} does not exist.`);
      });
    });
  });

  describe("GET /companies", () => {
    const endpoint = "companies";

    beforeAll(async () => {
      response = await apiClient.makeGetRequest({ endpoint, headers });
    });

    it("responds with HTTP 200 status", () => {
      expect(response.responseStatus).toEqual(200);
    });

    it("responds with list of all existing Companies", () => {
      const expectedCompanyIds = repository.findAll().map(company => company.id);
      const receivedCompanyIds = response.responseBody.map(company => company.id);
      expect(expectedCompanyIds).toEqual(receivedCompanyIds);
    });
  });

  describe("POST /companies", () => {
    const endpoint = "companies";

    itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, "Post");

    describe("when valid request", () => {
      const data = {
        name: "New",
        address: "Completely new",
        taxPayerNumber: "1223-451-12",
        telephone: "123 456 789",
        website: "www.example.com",
        email: "mail@example.com"
      };

      beforeAll(async () => {
        response = await apiClient.makePostRequest({ endpoint, headers, requestBody: data });
      });

      it("responds with HTTP 201 status", () => {
        expect(response.responseStatus).toEqual(201);
      });

      it("responds with ID of the newly created Company", () => {
        expect(response.responseBody.id).toBeTruthy();
      });

      it("responds with details of the newly created Company", () => {
        expect(response.responseBody.name).toEqual(data.name);
        expect(response.responseBody.address).toEqual(data.address);
        expect(response.responseBody.taxPayerNumber).toEqual(data.taxPayerNumber);
        expect(response.responseBody.email).toEqual(data.email);
        expect(response.responseBody.telephone).toEqual(data.telephone);
        expect(response.responseBody.website).toEqual(data.website);
      });
    });
  });

  describe("PATCH /companies/:id", () => {
    const endpoint = "companies/0";

    itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, "Patch");

    describe("when Company with requested ID exists", () => {
      const company = CompanyFactory.build();
      repository.save(company);
      const endpoint = `companies/${company.id}`;

      const data = {
        name: "New",
        address: "Completely new",
        taxPayerNumber: "1223-451-12",
        telephone: "123 456 789",
        website: "www.example.com",
        email: "mail@example.com"
      };

      beforeAll(async () => {
        response = await apiClient.makePatchRequest({ endpoint, headers, requestBody: data });
      });

      afterAll(() => {
        repository.destroy(company.id);
      });

      it("responds with HTTP 200 status", () => {
        expect(response.responseStatus).toEqual(200);
      });

      it("responds with requested Company id", () => {
        expect(response.responseBody.id).toEqual(company.id);
      });

      it("returns details of the updated Company", () => {
        expect(response.responseBody.name).toEqual(data.name);
        expect(response.responseBody.address).toEqual(data.address);
        expect(response.responseBody.taxPayerNumber).toEqual(data.taxPayerNumber);
        expect(response.responseBody.email).toEqual(data.email);
        expect(response.responseBody.telephone).toEqual(data.telephone);
        expect(response.responseBody.website).toEqual(data.website);
      });
    });

    describe("when Company with requested ID does not exist", () => {
      const invoiceId = "0";
      const endpoint = `companies/${invoiceId}`;

      beforeAll(async () => {
        response = await apiClient.makePatchRequest({ endpoint, headers });
      });

      it("responds with HTTP 404 status", () => {
        expect(response.responseStatus).toEqual(404);
      });

      it("responds with message about Company not found", () => {
        expect(response.responseBody.message).toEqual(`Company with id ${invoiceId} does not exist.`);
      });
    });
  });

  describe("DELETE /companies/:id", () => {
    const endpoint = "companies/0";

    itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, "Delete");

    describe("when Company with requested ID exists", () => {
      const company = CompanyFactory.build();
      repository.save(company);
      const endpoint = `companies/${company.id}`;

      beforeAll(async () => {
        response = await apiClient.makeDeleteRequest({ endpoint, headers });
      });

      it("responds with HTTP 200 status", () => {
        expect(response.responseStatus).toEqual(200);
      });

      it("responds with requested Company id", () => {
        expect(response.responseBody.id).toEqual(company.id);
      });

      it("returns details of the deleted Company", () => {
        expect(response.responseBody.name).toEqual(company.name);
        expect(response.responseBody.address).toEqual(company.address);
        expect(response.responseBody.taxPayerNumber).toEqual(company.taxPayerNumber);
        expect(response.responseBody.email).toEqual(company.email);
        expect(response.responseBody.telephone).toEqual(company.telephone);
        expect(response.responseBody.website).toEqual(company.website);
      });
    });

    describe("when Company with requested ID does not exist", () => {
      const invoiceId = "0";
      const endpoint = `companies/${invoiceId}`;

      beforeAll(async () => {
        response = await apiClient.makeDeleteRequest({ endpoint, headers });
      });

      it("responds with HTTP 404 status", () => {
        expect(response.responseStatus).toEqual(404);
      });

      it("responds with message about Company not found", () => {
        expect(response.responseBody.message).toEqual(`Company with id ${invoiceId} does not exist.`);
      });
    });
  });
});
