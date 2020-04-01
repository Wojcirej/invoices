export class CannotEditInvoiceError extends Error {
  message: string;
  name: string;

  constructor(message) {
    super(message);
    this.name = "CannotEditInvoiceError";
  }
}
