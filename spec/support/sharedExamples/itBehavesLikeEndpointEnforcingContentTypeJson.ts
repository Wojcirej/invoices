export const itBehavesLikeEndpointEnforcingContentTypeJson = (apiClient, endpoint, requestMethod) => {
  describe("it behaves like endpoint enforcing content type JSON", () => {
    describe("when Content-Type header is NOT set to application/json", () => {
      const headers = { "Content-Type": "application/pdf" };
      let response;

      beforeAll(async () => {
        response = await apiClient[`make${requestMethod}Request`]({
          endpoint,
          headers,
          requestBody: { message: "415 test case" }
        });
      });

      it("responds with HTTP 415 status", () => {
        expect(response.responseStatus).toEqual(415);
      });

      it("responds with message about not supported media type", () => {
        expect(response.responseBody.message).toEqual(
          "Unsupported media type - please make sure you have set 'Content-Type' header to 'application/json'."
        );
      });
    });
  });
};
