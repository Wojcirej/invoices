import httpMocks from "node-mocks-http";
import { statusHandler } from "./../../app/actions/status";

describe("GET /status action", () => {
  const mockRequest = httpMocks.createRequest({
    method: "GET",
    url: "/status"
  });
  const mockResponse = httpMocks.createResponse();

  it("returns info about HTTP health status", async () => {
    const expectedResponseBody = JSON.stringify({ status: { http: "Healthy" } });
    await statusHandler(mockRequest, mockResponse);

    const actualResponseBody = mockResponse._getData();
    expect(expectedResponseBody).toEqual(actualResponseBody);
  });
});
