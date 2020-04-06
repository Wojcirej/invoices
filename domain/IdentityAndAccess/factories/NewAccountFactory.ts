import faker from "faker";
import { v4 as uuid } from "uuid";

import { NewAccount } from "../NewAccount";

export class NewAccountFactory {
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

  public static build(data = {}): NewAccount {
    const id = uuid();
    if (Object.keys(data).length === 0) {
      return new NewAccountFactory({
        id,
        username: faker.internet.userName(),
        password: "!qaz2WSX",
        email: faker.internet.email()
      }).build();
    }
    const object = Object.assign({ id }, data);
    return new NewAccountFactory(object).build();
  }

  build(): NewAccount {
    return new NewAccount({
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email
    });
  }
}
