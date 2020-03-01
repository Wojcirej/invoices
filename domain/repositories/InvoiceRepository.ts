import fs from "fs";

export class InvoiceRepository {
  constructor() {
  }

  save(invoice: object, path = "/tmp/invoice.json"): boolean {
    fs.writeFileSync(path, JSON.stringify(invoice, null, 2));
    return true;
  }
}
