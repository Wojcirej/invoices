import faker from "faker";
import { v4 as uuid } from "uuid";
import { RegisteredAccount } from "../RegisteredAccount";
import { NewAccountFactory } from "./NewAccountFactory";

export class RegisteredAccountFactory {
  private readonly id: string;
  private readonly username: string;
  private readonly password: string;
  private readonly email: string;

  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
  }

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
