export class AccountNotFoundError extends Error {
  message: string;
  name: string;

  constructor(message: string) {
    super(message);
    this.name = "AccountNotFoundError";
  }
}
