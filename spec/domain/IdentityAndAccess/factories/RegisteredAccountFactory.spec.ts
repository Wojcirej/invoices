import { v4 as isUUIDv4 } from "is-uuid";

import { RegisteredAccountFactory } from "../../../../domain/IdentityAndAccess/factories/RegisteredAccountFactory";
import { RegisteredAccount } from "../../../../domain/IdentityAndAccess/RegisteredAccount";
import { AuthenticatedAccount } from "../../../../domain/IdentityAndAccess/AuthenticatedAccount";

describe("RegisteredAccountFactory", () => {
  describe(".build", () => {
    describe("when no param passed", () => {
      it("returns instance of RegisteredAccount", () => {
        expect(RegisteredAccountFactory.build()).toBeInstanceOf(RegisteredAccount);
      });

      it("returns instance of RegisteredAccount which does not contain plain text password", () => {
        const account = RegisteredAccountFactory.build();
        expect(Object.keys(account)).not.toContain("password");
      });

      it("returns instance of RegisteredAccount with ID being valid UUID", () => {
        const account = RegisteredAccountFactory.build();
        expect(account.id).toBeTruthy("RegisteredAccount's ID is empty");
        expect(isUUIDv4(account.id)).toBe(true);
      });
    });

    describe("when object with any properties passed", () => {
      const data = {
        username: "Username",
        password: "12345678",
        email: "email@example.com"
      };

      it("returns instance of RegisteredAccount", () => {
        expect(RegisteredAccountFactory.build()).toBeInstanceOf(RegisteredAccount);
      });

      it("returns instance of RegisteredAccount with matched values", () => {
        const account = RegisteredAccountFactory.build(data);
        expect(account.username).toEqual(data.username);
        expect(account.email).toEqual(data.email);
      });

      it("returns instance of RegisteredAccount which can be authenticated with passed password", () => {
        const account = RegisteredAccountFactory.build(data);
        expect(account.authenticate(data.password)).toBeInstanceOf(AuthenticatedAccount);
      });
    });
  });
});
