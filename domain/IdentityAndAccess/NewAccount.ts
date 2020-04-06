import { Account } from "./Account";
import bcrypt from "bcryptjs";

export class NewAccount extends Account {
  public readonly id: string;
  public readonly username: string;
  public readonly email: string;
  private readonly password: string;
  public encryptedPassword: string;
  public readonly errors;

  constructor(data) {
    super(data);
    this.password = data.password;
    this.errors = {};
  }

  isValid(): boolean {
    this.isValidUsername();
    this.isValidPassword();
    this.isValidEmail();
    return Object.keys(this.errors).length === 0;
  }

  encryptPassword(): void {
    if (this.hasEncryptedPassword()) return;
    const salt = bcrypt.genSaltSync(10);
    this.encryptedPassword = bcrypt.hashSync(this.password, salt);
  }

  hasEncryptedPassword(): boolean {
    return !!this.encryptedPassword;
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
