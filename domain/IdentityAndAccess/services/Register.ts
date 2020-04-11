import { NewAccountFactory } from "../factories/NewAccountFactory";
import { AccountEvent } from "../events/AccountEvent";
import { NewAccountRegistered } from "../events/NewAccountRegistered";
import { NewAccountNotRegistered } from "../events/NewAccountNotRegistered";

export class Register {
  private readonly data;
  private readonly repository;
  constructor(data, repository) {
    this.data = data;
    this.repository = repository;
  }

  public static call(data, repository): AccountEvent {
    return new Register(data, repository).call();
  }

  call(): AccountEvent {
    const account = NewAccountFactory.build(this.data);
    if (account.isValid()) {
      account.encryptPassword();
      this.repository.save(account);
      return new NewAccountRegistered(account);
    }
    return new NewAccountNotRegistered(account);
  }
}
