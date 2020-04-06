import { AccountEvent } from "./AccountEvent";

export class NewAccountRegistered extends AccountEvent {
  constructor(data) {
    super(data);
  }

  public wasSuccessful(): boolean {
    return true;
  }
}
