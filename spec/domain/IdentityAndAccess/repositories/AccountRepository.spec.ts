import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import fs from "fs";
import { NewAccountFactory } from "../../../../domain/IdentityAndAccess/factories/NewAccountFactory";
import { RegisteredAccount } from "../../../../domain/IdentityAndAccess/RegisteredAccount";

describe("AccountRepository", () => {
  const repository = new AccountsRepository();

  describe("#save", () => {
    describe("when success", () => {
      const account = NewAccountFactory.build();

      it("returns true", () => {
        expect(repository.save(account)).toBe(true);
      });

      it("saves passed object as JSON file in specified directory", () => {
        repository.save(account);
        expect(fs.existsSync(`${repository.path}/${account.id}.json`)).toBe(true);
      });
    });
  });

  describe("#findByUsername", () => {
    describe("when account with specified username exists", () => {
      let account, username;

      beforeAll(() => {
        account = NewAccountFactory.build();
        repository.save(account);
        username = account.username;
      });

      it("returns RegisteredAccount instance", () => {
        const foundAccount = repository.findByUsername(username);
        expect(foundAccount).toBeInstanceOf(RegisteredAccount);
      });

      it("returns account with requested username", () => {
        const foundAccount = repository.findByUsername(username);
        expect(foundAccount.username).toEqual(username);
      });
    });

    describe("when user with specified username does not exist", () => {
      const username = "notFound";

      it("throws AccountNotFoundError", () => {
        try {
          repository.findByUsername(username);
        } catch (error) {
          expect(error.name).toEqual("AccountNotFoundError");
          expect(error.message).toEqual(`Account with username ${username} does not exist`);
        }
      });
    });
  });
});
