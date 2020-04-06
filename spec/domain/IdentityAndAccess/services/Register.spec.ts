import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import { Register } from "../../../../domain/IdentityAndAccess/services/Register";
import { NewAccountRegistered } from "../../../../domain/IdentityAndAccess/events/NewAccountRegistered";

describe("Register", () => {
  describe(".call", () => {
    const repository = new AccountsRepository();

    describe("when valid data provided", () => {
      const data = { username: "username", password: "12345678", email: "email@example.com" };

      it("returns instance of NewAccountRegistered event", () => {
        expect(Register.call(data, repository)).toBeInstanceOf(NewAccountRegistered);
      });

      it("returns instance of the event indicating success", () => {
        const event = Register.call(data, repository);
        expect(event.wasSuccessful()).toBe(true);
      });

      it("returns event encapsulating username and email of newly registered user", () => {
        const event = Register.call(data, repository);
        expect(event.username).toEqual(data.username);
        expect(event.email).toEqual(data.email);
      });
    });
  });
});
