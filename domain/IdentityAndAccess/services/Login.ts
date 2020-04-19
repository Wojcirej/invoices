import { AuthenticatedAccount } from "../AuthenticatedAccount";
import { RegisteredAccount } from "../RegisteredAccount";

export class Login {
  private readonly username: string;
  private readonly password: string;
  private repository;

  constructor(credentials, repository) {
    this.username = credentials.username;
    this.password = credentials.password;
    this.repository = repository;
  }

  public static call(credentials, repository): AuthenticatedAccount {
    return new Login(credentials, repository).call();
  }

  public call(): AuthenticatedAccount {
    const account: RegisteredAccount = this.repository.findByUsername(this.username);
    return account.authenticate(this.password);
  }
}
