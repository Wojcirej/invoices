import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import fs from "fs";
import { AccountFactory } from "../../../../domain/IdentityAndAccess/factories/AccountFactory";

describe("AccountRepository", () => {
  const repository = new AccountsRepository();

  describe("#save", () => {
    describe("when success", () => {
      const account = AccountFactory.build();

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
