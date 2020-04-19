import { v4 as isUUIDv4 } from "is-uuid";

import { NewAccountFactory } from "../../../../domain/IdentityAndAccess/factories/NewAccountFactory";
import { NewAccount } from "../../../../domain/IdentityAndAccess/NewAccount";

describe("NewAccountFactory", () => {
  describe(".build", () => {
    describe("when no param passed", () => {
      it("returns instance of NewAccount", () => {
        const account = NewAccountFactory.build();
        expect(account).toBeInstanceOf(NewAccount);
      });

      it("returns valid instance of NewAccount", () => {
        const account = NewAccountFactory.build();
        expect(account.isValid()).toBe(true);
      });

      it("returns instance of NewAccount with ID being valid UUID", () => {
        const account = NewAccountFactory.build();
        expect(account.id).toBeTruthy("NewAccount's ID is empty");
        expect(isUUIDv4(account.id)).toBe(true);
      });
    });

    describe("when object with any properties passed", () => {
      const data = {
        username: "Username",
        password: "12345678",
        email: "email@example.com"
      };

      it("returns instance of NewAccount", () => {
        const account = NewAccountFactory.build();
        expect(account).toBeInstanceOf(NewAccount);
      });

      it("returns instance of NewAccount with matched values", () => {
        const account = NewAccountFactory.build(data);
        expect(account.username).toEqual(data.username);
        expect(account.email).toEqual(data.email);
      });
    });
  });
});
