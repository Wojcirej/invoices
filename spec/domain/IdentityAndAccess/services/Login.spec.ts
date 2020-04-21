import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import { NewAccountFactory } from "../../../../domain/IdentityAndAccess/factories/NewAccountFactory";
import { AuthenticatedAccount } from "../../../../domain/IdentityAndAccess/AuthenticatedAccount";
import { Login } from "../../../../domain/IdentityAndAccess/services/Login";
import { JsonWebToken } from "../../../../domain/IdentityAndAccess/utils/JsonWebToken";

describe("Login", () => {
  const repository = new AccountsRepository();

  describe(".call", () => {
    describe("when user with specified username does not exist", () => {
      it("throws AccountNotFoundError", () => {
        try {
          Login.call({ username: "", password: "12345678" }, repository);
        } catch (error) {
          expect(error.name).toEqual("AccountNotFoundError");
          expect(error.message).toEqual(`Account with username ${""} does not exist`);
        }
      });
    });

    describe("when user with specified username exists", () => {
      const data = { username: "testUsername", email: "email@example.com", password: "12345678" };

      beforeAll(() => {
        const account = NewAccountFactory.build(data);
        account.encryptPassword();
        repository.save(account);
      });

      afterAll(() => {
        const account = repository.findByUsername(data.username);
        repository.destroy(account.id);
      });

      describe("when correct password provided", () => {
        it("returns object containing instance of AuthenticatedAccount", () => {
          expect(Login.call(data, repository).account).toBeInstanceOf(AuthenticatedAccount);
        });

        it("returns object containing instance of AuthenticatedAccount with username as requested", () => {
          const account = Login.call(data, repository);
          expect(account.account.username).toEqual(data.username);
        });

        it("returns object containing token with encoded info about authenticated account", () => {
          const account = Login.call(data, repository);
          const decodedToken = JsonWebToken.decode(account.token);
          expect(decodedToken.data.username).toEqual(data.username);
          expect(decodedToken.data.email).toEqual(data.email);
        });
      });

      describe("when incorrect password provided", () => {
        it("throws AuthenticationError", () => {
          try {
            Login.call({ username: data.username, password: "" }, repository);
          } catch (error) {
            expect(error.name).toEqual("AuthenticationError");
            expect(error.message).toEqual(`Invalid password for account ${data.username}`);
          }
        });
      });
    });
  });
});
