export class AuthenticationError extends Error {
  message: string;
  name: string;

  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}
