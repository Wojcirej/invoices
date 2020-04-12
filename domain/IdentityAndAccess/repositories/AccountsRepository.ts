import path from "path";
import fs from "fs";
import { RegisteredAccount } from "../RegisteredAccount";
import { AccountNotFoundError } from "../errors/AccountNotFoundError";
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

  findByUsername(username: string): RegisteredAccount {
    const allAccounts = this.findAll();
    const searchedAccount = allAccounts.find(account => account.username === username);
    if (!searchedAccount) throw new AccountNotFoundError(`Account with username ${username} does not exist`);
    return searchedAccount;
  }

  private findAll(): Array<RegisteredAccount> {
    const all = fs.readdirSync(this.path);
    return all.map(accountEntry => {
      const account = JSON.parse(fs.readFileSync(`${this.path}/${accountEntry}`).toString());
      return new RegisteredAccount(account);
    });
  }

  destroy(id: string): boolean {
    const all = this.findAll();
    const account = all.find(acc => acc.id === id);
    if (!account) throw new AccountNotFoundError(`Account with ID ${id} could not be deleted - it doesn't exist`);
    fs.unlinkSync(`${this.path}/${account.id}.json`);
    return !fs.existsSync(`${this.path}/${account.id}.json`);
  }
}
