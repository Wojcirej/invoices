import faker from "faker";
import { v4 as uuid } from "uuid";

import { Account } from "../Account";

export class AccountFactory {
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

  public static build(data = {}): Account {
    const id = uuid();
    if (Object.keys(data).length === 0) {
      return new AccountFactory({
        id,
        username: faker.internet.userName(),
        password: "!qaz2WSX",
        email: faker.internet.email()
      }).build();
    }
    const object = Object.assign({ id }, data);
    return new AccountFactory(object).build();
  }

  build(): Account {
    return new Account({
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email
    });
  }
}
