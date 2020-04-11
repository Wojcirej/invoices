import { AccountEvent } from "./AccountEvent";

export class NewAccountRegistered extends AccountEvent {
  private readonly id: string;
  constructor(data) {
    super(data);
    this.id = data.id;
  }

  public wasSuccessful(): boolean {
    return true;
  }
}
