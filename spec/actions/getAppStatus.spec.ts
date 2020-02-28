import httpMocks from "node-mocks-http";
import { getAppStatus } from "./../../app/actions/getAppStatus";

describe("GET /status action", () => {
  const mockRequest = httpMocks.createRequest({
    method: "GET",
    url: "/status"
  });
  const mockResponse = httpMocks.createResponse();

  it("returns info about HTTP health status", async () => {
    const expectedResponseBody = JSON.stringify({ status: { http: "Healthy" } });
    await getAppStatus(mockRequest, mockResponse);

    const actualResponseBody = mockResponse._getData();
    expect(expectedResponseBody).toEqual(actualResponseBody);
  });
});
