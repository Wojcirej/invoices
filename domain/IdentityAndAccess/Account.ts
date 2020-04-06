import { AccountParams } from "./interfaces/AccountParams";

export class Account implements AccountParams {
  public readonly id: string;
  public readonly username: string;
  public readonly password: string;
  public readonly email: string;
  public readonly errors;

  constructor(data: AccountParams) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.errors = {};
  }

  isValid(): boolean {
    this.isValidUsername();
    this.isValidPassword();
    this.isValidEmail();
    return Object.keys(this.errors).length === 0;
  }

  private isValidUsername(): boolean {
    const result = this.isValidString(this.username);
    if (result) return true;
    this.errors["username"] = "Username is empty";
    return false;
  }

  private isValidPassword(): boolean {
    if (!this.isValidString(this.password)) {
      this.errors["password"] = "Password is empty - should have minimum 8 characters";
      return false;
    }
    if (this.password.length > 20) {
      this.errors["password"] = "Password is too long - should have maximum 20 characters";
      return false;
    }
    return true;
  }

  private isValidEmail(): boolean {
    if (!this.isValidString(this.email)) {
      this.errors["email"] = "Email is empty";
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors["email"] = "Email has invalid format";
      return false;
    }
    return true;
  }

  private isValidString(value): boolean {
    return !!value && typeof value === "string" && value.length > 0;
  }
}
