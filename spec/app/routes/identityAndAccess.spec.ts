import { setUpTestServer } from "../../support/testServer";
import { validHeaders } from "../../support/validHeaders";
import { itBehavesLikeEndpointEnforcingContentTypeJson } from "../../support/sharedExamples";
import { apiClient } from "../../support/lib";

const headers = validHeaders.contentType;
let server, response;

describe("Identity and access router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /register", () => {
    const endpoint = "register";
    const expectedAccountKeys = ["username", "email", "id"];

    itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, "Post");

    describe("when valid request", () => {
      const data = {
        username: "username",
        password: "12345678",
        email: "mail@example.com"
      };

      beforeAll(async () => {
        response = await apiClient.makePostRequest({ endpoint, headers, requestBody: data });
      });

      it("responds with HTTP 201 status", () => {
        expect(response.responseStatus).toEqual(201);
      });

      it("responds with ID of the newly created account", () => {
        expect(response.responseBody.id).toBeTruthy();
      });

      it("returns object describing newly created account", () => {
        expect(Object.keys(response.responseBody)).toEqual(expectedAccountKeys);
      });

      it("responds with details of the newly created account", () => {
        expect(response.responseBody.username).toEqual(data.username);
        expect(response.responseBody.email).toEqual(data.email);
      });
    });

    describe("when invalid request", () => {
      const data = {
        username: "",
        password: "",
        email: ""
      };

      beforeAll(async () => {
        response = await apiClient.makePostRequest({ endpoint, headers, requestBody: data });
      });

      it("responds with HTTP 422 status", () => {
        expect(response.responseStatus).toEqual(422);
      });

      it("returns object describing failed action", () => {
        expect(Object.keys(response.responseBody)).toEqual(["username", "email", "errors"]);
      });

      it("responds with details of the potential new account", () => {
        expect(response.responseBody.username).toEqual(data.username);
        expect(response.responseBody.email).toEqual(data.email);
      });

      it("responds with error messages", () => {
        const errors = response.responseBody.errors;
        expect(errors.username).toEqual("Username is empty");
        expect(errors.password).toEqual("Password is empty - should have minimum 8 characters");
        expect(errors.email).toEqual("Email is empty");
      });
    });
  });
});
