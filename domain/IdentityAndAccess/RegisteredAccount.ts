import { Account } from "./Account";

export class RegisteredAccount extends Account {
  private readonly encryptedPassword: string;
  constructor(data) {
    super(data);
    this.encryptedPassword = data.entryptedPassword;
  }
}
