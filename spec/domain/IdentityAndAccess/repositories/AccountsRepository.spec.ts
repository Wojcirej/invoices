import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import fs from "fs";
import { NewAccountFactory } from "../../../../domain/IdentityAndAccess/factories/NewAccountFactory";
import { RegisteredAccount } from "../../../../domain/IdentityAndAccess/RegisteredAccount";

describe("AccountsRepository", () => {
  const repository = new AccountsRepository();

  describe("#save", () => {
    describe("when success", () => {
      const account = NewAccountFactory.build();

      afterAll(() => {
        repository.destroy(account.id);
      });

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

      afterAll(() => {
        repository.destroy(account.id);
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

  describe("#destroy", () => {
    describe("when user with specified ID does not exist", () => {
      const id = "0";

      it("throws AccountNotFoundError", () => {
        try {
          repository.destroy(id);
        } catch (error) {
          expect(error.name).toEqual("AccountNotFoundError");
          expect(error.message).toEqual(`Account with ID ${id} could not be deleted - it doesn't exist`);
        }
      });
    });

    describe("when user with specified ID exists", () => {
      let accountId;

      beforeEach(() => {
        const account = NewAccountFactory.build();
        repository.save(account);
        accountId = account.id;
      });

      it("returns true", () => {
        expect(repository.destroy(accountId)).toBe(true);
      });

      it("deletes account with provided ID", () => {
        expect(fs.existsSync(`${repository.path}/${accountId}.json`)).toBe(true);
        repository.destroy(accountId);
        expect(fs.existsSync(`${repository.path}/${accountId}.json`)).toBe(false);
      });
    });
  });
});
