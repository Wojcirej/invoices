import { AccountFactory } from "../../../domain/IdentityAndAccess/factories/AccountFactory";

describe("Account", () => {
  describe("#isValid", () => {
    describe("when valid data provided", () => {
      const data = { username: "username", password: "123456789", email: "email@example.com" };

      it("returns true", () => {
        const account = AccountFactory.build(data);
        expect(account.isValid()).toBe(true);
      });

      it("does not report any error messages", () => {
        const account = AccountFactory.build(data);
        account.isValid();
        expect(account.errors.username).toEqual(undefined);
        expect(account.errors.email).toEqual(undefined);
        expect(account.errors.password).toEqual(undefined);
      });
    });

    describe("when username, password and email are set to null", () => {
      const data = { username: null, password: null, email: null };

      it("returns false", () => {
        const account = AccountFactory.build(data);
        expect(account.isValid()).toBe(false);
      });

      it("reports all error messages", () => {
        const account = AccountFactory.build(data);
        account.isValid();
        expect(account.errors.username).toEqual("Username is empty");
        expect(account.errors.email).toEqual("Email is empty");
        expect(account.errors.password).toEqual("Password is empty - should have minimum 8 characters");
      });
    });

    describe("when username, password and email are set to empty strings", () => {
      const data = { username: "", password: "", email: "" };

      it("returns false", () => {
        const account = AccountFactory.build(data);
        expect(account.isValid()).toBe(false);
      });

      it("reports all error messages", () => {
        const account = AccountFactory.build(data);
        account.isValid();
        expect(account.errors.username).toEqual("Username is empty");
        expect(account.errors.email).toEqual("Email is empty");
        expect(account.errors.password).toEqual("Password is empty - should have minimum 8 characters");
      });
    });

    describe("when password has over 20 characters", () => {
      const data = { username: "username", password: "12345678901234567890123", email: "email@example.com" };

      it("returns false", () => {
        const account = AccountFactory.build(data);
        expect(account.isValid()).toBe(false);
      });

      it("reports error message about password being too long", () => {
        const account = AccountFactory.build(data);
        account.isValid();
        expect(account.errors.username).toEqual(undefined);
        expect(account.errors.email).toEqual(undefined);
        expect(account.errors.password).toEqual("Password is too long - should have maximum 20 characters");
      });
    });

    describe("when email does not have valid format", () => {
      const data = { username: "username", password: "12345678", email: "email[at]example.com" };

      it("returns false", () => {
        const account = AccountFactory.build(data);
        expect(account.isValid()).toBe(false);
      });

      it("reports error message about invalid email format", () => {
        const account = AccountFactory.build(data);
        account.isValid();
        expect(account.errors.username).toEqual(undefined);
        expect(account.errors.email).toEqual("Email has invalid format");
        expect(account.errors.password).toEqual(undefined);
      });
    });
  });
});
