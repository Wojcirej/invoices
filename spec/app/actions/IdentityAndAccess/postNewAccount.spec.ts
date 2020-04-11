import httpMocks from "node-mocks-http";
import { postNewAccount } from "../../../../app/actions/IdentityAndAccess/postNewAccount";

describe("postNewAccount", () => {
  describe("when valid data", () => {
    const data = { username: "username", password: "12345678", email: "email@example.com" };
    const mockRequest = httpMocks.createRequest({
      method: "POST",
      url: "/register",
      body: data
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await postNewAccount(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns ID of the newly created account", () => {
      expect(actualResponseBody.id).toBeTruthy();
    });

    it("returns object describing newly created account", () => {
      expect(Object.keys(actualResponseBody)).toEqual(["username", "email", "id"]);
    });

    it("returns details of the newly created account", () => {
      expect(actualResponseBody.username).toEqual(data.username);
      expect(actualResponseBody.email).toEqual(data.email);
    });
  });

  describe("when invalid data", () => {
    const data = { username: "", password: "", email: "" };
    const mockRequest = httpMocks.createRequest({
      method: "POST",
      url: "/register",
      body: data
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await postNewAccount(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns details of the potential new account", () => {
      expect(actualResponseBody.username).toEqual(data.username);
      expect(actualResponseBody.email).toEqual(data.email);
    });

    it("returns object indicating not successful action", () => {
      expect(Object.keys(actualResponseBody)).toEqual(["username", "email", "errors"]);
    });

    it("returns error messages", () => {
      const errors = actualResponseBody.errors;
      expect(errors.username).toEqual("Username is empty");
      expect(errors.password).toEqual("Password is empty - should have minimum 8 characters");
      expect(errors.email).toEqual("Email is empty");
    });
  });
});
