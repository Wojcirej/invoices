import fs from "fs";
import path from "path";
import { Invoice } from "../Invoice";
import { CompanyFactory } from "../factories/CompanyFactory";
import { OrderFactory } from "../factories/OrderFactory";
import { InvoiceNotFoundError } from "../errors/InvoiceNotFoundError";

export class InvoiceRepository {
  private readonly path: string;

  constructor() {
    this.path = path.join(process.cwd(), "/tmp/db/invoices");
  }

  save(invoice: Invoice): boolean {
    fs.writeFileSync(`${this.path}/${invoice.id}.json`, JSON.stringify(invoice, null, 2));
    return true;
  }

  find(invoiceId: string): Invoice {
    const all = this.findAll();
    const invoice = all.find(invoice => invoice.id === invoiceId);
    if (!invoice) {
      throw new InvoiceNotFoundError(`Invoice with id ${invoiceId} does not exist.`);
    }
    return invoice;
  }

  findAll(): Array<Invoice> {
    const all = fs.readdirSync(this.path);
    return all.map(invoiceEntry => {
      const invoice = JSON.parse(fs.readFileSync(`${this.path}/${invoiceEntry}`).toString());
      return new Invoice({
        invoiceDetails: {
          id: invoice.id,
          status: invoice.status,
          issuedAt: invoice.issuedAt,
          invoiceNumber: invoice.invoiceNumber,
          saleDate: invoice.saleDate
        },
        buyer: CompanyFactory.build(invoice.buyer),
        seller: CompanyFactory.build(invoice.seller),
        order: OrderFactory.build(invoice.order.orderRows)
      });
    });
  }
}
