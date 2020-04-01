import fetch from "node-fetch";

export const itBehavesLikeEndpointEnforcingContentTypeJson = (endpoint, requestMethod) => {
  describe("it behaves like endpoint enforcing content type JSON", () => {
    describe("when Content-Type header is NOT set to application/json", () => {
      let res, status, body;

      beforeAll(async () => {
        res = await fetch(endpoint, {
          method: requestMethod,
          headers: { "Content-Type": "application/pdf" }
        });
        status = await res.status;
        body = await res.json();
      });

      it("responds with HTTP 415 status", () => {
        expect(status).toEqual(415);
      });

      it("responds with message about not supported media type", () => {
        expect(body.message).toEqual(
          "Unsupported media type - please make sure you have set 'Content-Type' header to 'application/json'."
        );
      });
    });
  });
};
