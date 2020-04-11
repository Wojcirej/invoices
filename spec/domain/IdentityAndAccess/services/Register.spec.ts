import { AccountsRepository } from "../../../../domain/IdentityAndAccess/repositories/AccountsRepository";
import { Register } from "../../../../domain/IdentityAndAccess/services/Register";
import { NewAccountRegistered } from "../../../../domain/IdentityAndAccess/events/NewAccountRegistered";
import { NewAccountNotRegistered } from "../../../../domain/IdentityAndAccess/events/NewAccountNotRegistered";

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

    describe("when invalid data provided", () => {
      const data = { username: "", password: "", email: "" };
      it("returns instance of NewAccountNotRegistered event", () => {
        expect(Register.call(data, repository)).toBeInstanceOf(NewAccountNotRegistered);
      });

      it("returns instance of the event indicating failure", () => {
        const event = Register.call(data, repository);
        expect(event.wasSuccessful()).toBe(false);
      });

      it("returns event encapsulating username and email of the potential new account", () => {
        const event = Register.call(data, repository);
        expect(event.username).toEqual(data.username);
        expect(event.email).toEqual(data.email);
      });
    });
  });
});
