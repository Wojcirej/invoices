import { v4 as isUUIDv4 } from "is-uuid";

import { AccountFactory } from "../../../domain/IdentityAndAccess/factories/AccountFactory";
import { Account } from "../../../domain/IdentityAndAccess/Account";

describe("AccountFactory", () => {
  describe(".build", () => {
    describe("when no param passed", () => {
      it("returns instance of Account", () => {
        const account = AccountFactory.build();
        expect(account).toBeInstanceOf(Account);
      });

      it("returns valid instance of Company", () => {
        const account = AccountFactory.build();
        expect(account.isValid()).toBe(true);
      });

      it("returns instance of Company with ID being valid UUID", () => {
        const account = AccountFactory.build();
        expect(account.id).toBeTruthy("Company's ID is empty");
        expect(isUUIDv4(account.id)).toBe(true);
      });
    });

    describe("when object with any properties passed", () => {
      const data = {
        username: "Username",
        password: "12345678",
        email: "email@example.com"
      };

      it("returns instance of Account", () => {
        const account = AccountFactory.build();
        expect(account).toBeInstanceOf(Account);
      });

      it("returns instance of Account with matched values", () => {
        const account = AccountFactory.build(data);
        expect(account.username).toEqual(data.username);
        expect(account.email).toEqual(data.email);
        expect(account.password).toEqual(data.password);
      });
    });
  });
});
