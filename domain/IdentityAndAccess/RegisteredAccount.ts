import bcrypt from "bcryptjs";
import { Account } from "./Account";
import { AuthenticatedAccount } from "./AuthenticatedAccount";
import { AuthenticationError } from "./errors/AuthenticationError";

export class RegisteredAccount extends Account {
  private readonly encryptedPassword: string;
  constructor(data) {
    super(data);
    this.encryptedPassword = data.password;
  }

  authenticate(password: string): AuthenticatedAccount {
    if (bcrypt.compareSync(password, this.encryptedPassword)) {
      return new AuthenticatedAccount({ id: this.id, username: this.username, email: this.email });
    }
    throw new AuthenticationError(`Invalid password for account ${this.username}`);
  }
}
