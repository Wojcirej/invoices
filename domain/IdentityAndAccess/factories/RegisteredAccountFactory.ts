import { RegisteredAccount } from "../RegisteredAccount";
import { NewAccountFactory } from "./NewAccountFactory";

export class RegisteredAccountFactory {
  public static build(data = {}): RegisteredAccount {
    const account = NewAccountFactory.build(data);
    account.encryptPassword();
    return new RegisteredAccount({
      id: account.id,
      username: account.username,
      password: account.encryptedPassword,
      email: account.email
    });
  }
}
