import { AuthenticatedAccount } from "../../../domain/IdentityAndAccess/AuthenticatedAccount";
import { RegisteredAccountFactory } from "../../../domain/IdentityAndAccess/factories/RegisteredAccountFactory";

describe("RegisteredAccount", () => {
  const password = "12345678";
  const data = { username: "username", email: "email@example.com", password };
  let account;

  describe("#authenticate", () => {
    beforeAll(() => {
      account = RegisteredAccountFactory.build(data);
    });

    describe("when passwords match", () => {
      it("returns instance of AuthenticatedAccount", () => {
        expect(account.authenticate(data.password)).toBeInstanceOf(AuthenticatedAccount);
      });

      it("returns instance of AuthenticatedAccount with account details", () => {
        const authenticatedAccount = account.authenticate(data.password);
        expect(authenticatedAccount.id).toEqual(account.id);
        expect(authenticatedAccount.username).toEqual(data.username);
        expect(authenticatedAccount.email).toEqual(data.email);
      });
    });

    describe("when passwords do not match", () => {
      it("throws AuthenticationError", () => {
        try {
          console.log(account);
          account.authenticate("");
        } catch (error) {
          expect(error.name).toEqual("AuthenticationError");
          expect(error.message).toEqual(`Invalid password for account ${account.username}`);
        }
      });
    });
  });
});
