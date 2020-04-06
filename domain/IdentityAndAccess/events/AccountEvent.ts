export abstract class AccountEvent {
  public readonly username: string;
  public readonly email: string;

  protected constructor(data) {
    this.username = data.username;
    this.email = data.email;
  }

  public abstract wasSuccessful(): boolean;
}
