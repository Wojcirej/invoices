import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import fs from "fs";
import { NewAccountFactory } from "../../../../domain/IdentityAndAccess/factories/NewAccountFactory";

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
});
