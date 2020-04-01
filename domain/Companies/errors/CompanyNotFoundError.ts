export class CompanyNotFoundError extends Error {
  message: string;
  name: string;

  constructor(message: string) {
    super(message);
    this.name = "CompanyNotFoundError";
  }
}
