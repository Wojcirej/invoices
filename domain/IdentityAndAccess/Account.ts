export abstract class Account {
  public id?: string;
  public readonly username: string;
  public readonly email: string;

  protected constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
  }
}
