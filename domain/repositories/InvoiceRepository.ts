import fs from "fs";
import path from "path";
import { Invoice } from "../Invoice";

export class InvoiceRepository {
  save(invoice: Invoice): boolean {
    fs.writeFileSync(path.join(process.cwd(), `/tmp/db/invoices/${invoice.id}.json`), JSON.stringify(invoice, null, 2));
    return true;
  }
}
