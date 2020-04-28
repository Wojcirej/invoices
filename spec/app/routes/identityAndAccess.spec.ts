import { setUpTestServer } from "../../support/testServer";
import { validHeaders } from "../../support/validHeaders";
import { itBehavesLikeEndpointEnforcingContentTypeJson } from "../../support/sharedExamples";
import { apiClient } from "../../support/lib";
import { AccountsRepository } from "../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import { NewAccountFactory } from "../../../domain/IdentityAndAccess/factories/NewAccountFactory";
import { JsonWebToken } from "../../../domain/IdentityAndAccess/utils/JsonWebToken";

const headers = validHeaders.contentType;
let server, response;

describe("Identity and access router", () => {
  beforeAll(() => {
    server = setUpTestServer();
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /login", () => {
    const endpoint = "login";
    const expectedAccountKeys = ["username", "email", "id"];
    const repository = new AccountsRepository();

    itBehavesLikeEndpointEnforcingContentTypeJson(apiClient, endpoint, "Post");

    describe("when user with specified username does not exist", () => {
      const credentials = { username: "", password: "12345678" };

      beforeAll(async () => {
        response = await apiClient.makePostRequest({ endpoint, headers, requestBody: credentials });
      });

      it("responds with HTTP 404 status", () => {
        expect(response.responseStatus).toEqual(404);
      });

      it("responds with message about account with specified username not existing", () => {
        expect(response.responseBody.message).toEqual(`Account with username ${credentials.username} does not exist`);
      });
    });

    describe("when user with specified username exists", () => {
      describe("when correct password provided", () => {
        const data = { username: "testEndpointUsername", password: "12345678", email: "email@example.com" };
        const credentials = { username: data.username, password: data.password };
        let account;

        beforeAll(async () => {
          account = NewAccountFactory.build(data);
          account.encryptPassword();
          repository.save(account);
          response = await apiClient.makePostRequest({ endpoint, headers, requestBody: credentials });
        });

        afterAll(() => {
          repository.destroy(account.id);
        });

        it("responds with HTTP 201 status", () => {
          expect(response.responseStatus).toEqual(201);
        });

        it("responds with account which can be identified by ID", () => {
          expect(response.responseBody.id).toBeTruthy();
        });

        it("responds with details of authenticated account", () => {
          expect(response.responseBody.username).toEqual(data.username);
          expect(response.responseBody.email).toEqual(data.email);
        });

        it("responds with token containing data allowing account identification", () => {
          const token = response.responseHeaders["x-user-access-token"][0];
          const decodedToken = JsonWebToken.decode(token);
          expect(decodedToken.data.username).toEqual(data.username);
          expect(decodedToken.data.email).toEqual(data.email);
        });
      });

      describe("when incorrect password provided", () => {
        const data = { username: "testEndpointUsername", password: "", email: "email@example.com" };
        const credentials = { username: data.username, password: "incorrect" };
        let account;

        beforeAll(async () => {
          account = NewAccountFactory.build(data);
          account.encryptPassword();
          repository.save(account);
          response = await apiClient.makePostRequest({ endpoint, headers, requestBody: credentials });
        });

        afterAll(() => {
          repository.destroy(account.id);
        });

        it("responds with HTTP 401 status", () => {
          expect(response.responseStatus).toEqual(401);
        });

        it("responds with message about invalid credentials", () => {
          expect(response.responseBody.message).toEqual(`Invalid password for account ${credentials.username}`);
        });
      });
    });
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
