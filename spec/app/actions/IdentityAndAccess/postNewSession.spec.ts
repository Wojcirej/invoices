import httpMocks from "node-mocks-http";
import { postNewSession } from "../../../../app/actions/IdentityAndAccess/postNewSession";
import { NewAccountFactory } from "../../../../domain/IdentityAndAccess/factories/NewAccountFactory";
import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";

describe("postNewSession", () => {
  const repository = new AccountsRepository();

  describe("when user with specified username does not exist", () => {
    const credentials = { username: "", password: "12345678" };
    const mockRequest = httpMocks.createRequest({
      method: "POST",
      url: "/login",
      body: credentials
    });
    const mockResponse = httpMocks.createResponse();
    let actualResponseBody;

    beforeAll(async () => {
      await postNewSession(mockRequest, mockResponse);
      actualResponseBody = JSON.parse(mockResponse._getData());
    });

    it("returns message that account does not exist", () => {
      expect(actualResponseBody.message).toEqual(`Account with username ${credentials.username} does not exist`);
    });
  });

  describe("when user with specified username exists", () => {
    describe("when correct password provided", () => {
      const data = { username: "testActionUsername", password: "12345678", email: "email@example.com" };
      const credentials = { username: data.username, password: data.password };
      const mockRequest = httpMocks.createRequest({
        method: "POST",
        url: "/login",
        body: credentials
      });
      const mockResponse = httpMocks.createResponse();
      let actualResponseBody, account;

      beforeAll(async () => {
        account = NewAccountFactory.build(data);
        account.encryptPassword();
        repository.save(account);

        await postNewSession(mockRequest, mockResponse);
        actualResponseBody = JSON.parse(mockResponse._getData());
      });

      afterAll(() => {
        repository.destroy(account.id);
      });

      it("returns object describing authenticated account", () => {
        expect(Object.keys(actualResponseBody)).toEqual(["id", "username", "email"]);
      });

      it("returns object containing details of the authenticated user with provided username", () => {
        expect(actualResponseBody.username).toEqual(account.username);
        expect(actualResponseBody.email).toEqual(account.email);
      });
    });

    describe("when incorrect password provided", () => {
      const data = { username: "testActionUsername", password: "12345678", email: "email@example.com" };
      const credentials = { username: data.username, password: "" };
      const mockRequest = httpMocks.createRequest({
        method: "POST",
        url: "/login",
        body: credentials
      });
      const mockResponse = httpMocks.createResponse();
      let actualResponseBody, account;

      beforeAll(async () => {
        account = NewAccountFactory.build(data);
        account.encryptPassword();
        repository.save(account);

        await postNewSession(mockRequest, mockResponse);
        actualResponseBody = JSON.parse(mockResponse._getData());
      });

      afterAll(() => {
        repository.destroy(account.id);
      });

      it("returns message about invalid credentials", () => {
        expect(actualResponseBody.message).toEqual("Invalid password for account testActionUsername");
      });
    });
  });
});
