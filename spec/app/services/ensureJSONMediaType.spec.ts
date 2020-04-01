import httpMocks, { RequestMethod } from "node-mocks-http";
import { ensureJSONMediaType } from "../../../app/middleware/ensureJSONMediaType";
import { invoicePayload } from "../../support/mocks/payloadSamples";

const supportedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const next = (): void => {
  console.log("Content type correct");
};

describe("ensureJSONMediaType", () => {
  supportedMethods.forEach(method => {
    describe(`when ${method} request`, () => {
      describe("when Content-Type header set to 'application/json'", () => {
        const mockRequest = httpMocks.createRequest({
          method: method as RequestMethod,
          url: "/anything",
          headers: {
            "Content-Type": "application/json"
          },
          body: invoicePayload
        });
        const mockResponse = httpMocks.createResponse();

        it("passes request forward and calls next function", async () => {
          await ensureJSONMediaType(mockRequest, mockResponse, next);
        });
      });

      describe("when Content-Type header is not set to 'application/json'", () => {
        const mockRequest = httpMocks.createRequest({
          method: method as RequestMethod,
          url: "/anything",
          headers: {
            "Content-Type": "application/text"
          }
        });
        const mockResponse = httpMocks.createResponse();

        it("returns message about unsupported media type and does not call next function", async () => {
          await ensureJSONMediaType(mockRequest, mockResponse, next);
          const response = JSON.parse(mockResponse._getData());
          expect(response.message).toEqual(
            "Unsupported media type - please make sure you have set 'Content-Type' header to 'application/json'."
          );
        });
      });
    });
  });
});
