class InvoiceInMemoryRepository {
  public readonly invoices;

  constructor() {
    this.invoices = [];
  }

  save(invoice: object): boolean {
    this.invoices.push(invoice);
    return true;
  }
}

import fs from "fs";
import { CreateNewInvoice } from "../../../app/services/CreateNewInvoice";

describe("CreateNewInvoice", () => {
  describe(".call", () => {
    afterEach(() => {
      if (fs.existsSync("/tmp/invoice.json")) {
        fs.unlinkSync("/tmp/invoice.json");
      }
    });
    const invoiceData = {
      invoice: {
        issuedAt: new Date().getTime(),
        saleDate: new Date().getTime(),
        seller: {
          name: "Selling Company",
          address: "Wonderland",
          taxPayerNumber: "123-45-67-819",
          telephone: "123 456 789",
          email: "email@example.com",
          website: "http://www.example.com"
        },
        buyer: {
          name: "Buying Company",
          address: "Noland",
          taxPayerNumber: "012-34-56-789",
          telephone: "012 345 678",
          email: "email@example.com",
          website: "http://www.example.com"
        },
        order: [
          {
            product: {
              position: 1,
              name: "Pen",
              netPrice: 1.99,
              valueAddedTax: 0.23
            },
            quantity: 5
          },
          {
            product: {
              position: 2,
              name: "Pencil",
              netPrice: 0.8,
              valueAddedTax: 0.23
            },
            quantity: 10
          }
        ]
      }
    };
    it("creates new Invoice", () => {
      const repository = new InvoiceInMemoryRepository();
      const invoiceCountBefore = repository.invoices.length;
      CreateNewInvoice.call(invoiceData, repository);
      const invoiceCountAfter = repository.invoices.length;
      expect(invoiceCountAfter).toEqual(invoiceCountBefore + 1);
    });
  });
});
