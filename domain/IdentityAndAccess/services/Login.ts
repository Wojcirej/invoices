import { RegisteredAccount } from "../RegisteredAccount";
import { AccountSession } from "../interfaces/AccountSession";
import { JsonWebToken } from "../utils/JsonWebToken";

export class Login {
  private readonly username: string;
  private readonly password: string;
  private repository;

  constructor(credentials, repository) {
    this.username = credentials.username;
    this.password = credentials.password;
    this.repository = repository;
  }

  public static call(credentials, repository): AccountSession {
    return new Login(credentials, repository).call();
  }

  public call(): AccountSession {
    const account: RegisteredAccount = this.repository.findByUsername(this.username);
    const authenticatedAccount = account.authenticate(this.password);
    return { account: authenticatedAccount, token: JsonWebToken.encode(authenticatedAccount) };
  }
}
