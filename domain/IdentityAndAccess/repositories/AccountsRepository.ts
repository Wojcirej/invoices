import path from "path";
import fs from "fs";
import { NewAccount } from "../NewAccount";

export class AccountsRepository {
  public readonly path: string;

  constructor() {
    this.path = path.join(process.cwd(), "/tmp/db/accounts");
  }

  save(account: NewAccount): boolean {
    const objectToSave = {
      id: account.id,
      username: account.username,
      email: account.email,
      password: account.encryptedPassword
    };
    fs.writeFileSync(`${this.path}/${account.id}.json`, JSON.stringify(objectToSave, null, 2));
    return true;
  }
}
