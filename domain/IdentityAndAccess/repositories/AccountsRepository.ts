import path from "path";
import fs from "fs";
import { Account } from "../Account";

export class AccountsRepository {
  public readonly path: string;

  constructor() {
    this.path = path.join(process.cwd(), "/tmp/db/accounts");
  }

  save(account: Account): boolean {
    fs.writeFileSync(`${this.path}/${account.id}.json`, JSON.stringify(account, null, 2));
    return true;
  }
}
