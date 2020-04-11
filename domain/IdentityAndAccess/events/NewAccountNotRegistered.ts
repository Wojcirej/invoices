import { AccountEvent } from "./AccountEvent";

export class NewAccountNotRegistered extends AccountEvent {
  private readonly errors;
  constructor(data) {
    super(data);
    this.errors = data.errors;
  }

  public wasSuccessful(): boolean {
    return false;
  }
}
