import { InvoiceFactory } from "../../../domain/factories/InvoiceFactory";
import { Invoice } from "../../../domain/Invoice";
import InvoiceStatuses from "../../../domain/lib/InvoiceStatuses";
import { Company } from "../../../domain/Company";
import { Order } from "../../../domain/Order";
import { Product } from "../../../domain/Product";

describe("InvoiceFactory", () => {
  const data = {
    invoice: {
      invoiceNumber: "FV 1/03/2020",
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
  describe(".build", () => {
    let invoice: Invoice;

    beforeAll(() => {
      invoice = InvoiceFactory.build(data);
    });

    it("returns Invoice aggregate", () => {
      expect(invoice).toBeInstanceOf(Invoice);
    });

    it("returns Invoice aggregate with invoice number as in params", () => {
      expect(invoice.invoiceNumber).toEqual(data.invoice.invoiceNumber);
    });

    it("returns Invoice aggregate with invoice sale date as in params", () => {
      expect(invoice.saleDate).toEqual(new Date(data.invoice.saleDate));
    });

    it("returns Invoice aggregate with invoice issue date as in params", () => {
      expect(invoice.issuedAt).toEqual(new Date(data.invoice.issuedAt));
    });

    it("returns Invoice aggregate with added invoice", () => {
      expect(invoice.status).toEqual(InvoiceStatuses.Added);
    });

    it("returns Invoice aggregate with buyer as Company instance", () => {
      expect(invoice.buyer).toBeInstanceOf(Company);
    });

    it("returns Invoice aggregate with aggregated buyer details as in params", () => {
      expect(invoice.buyer.address).toEqual(data.invoice.buyer.address);
      expect(invoice.buyer.email).toEqual(data.invoice.buyer.email);
      expect(invoice.buyer.name).toEqual(data.invoice.buyer.name);
      expect(invoice.buyer.taxPayerNumber).toEqual(data.invoice.buyer.taxPayerNumber);
      expect(invoice.buyer.telephone).toEqual(data.invoice.buyer.telephone);
      expect(invoice.buyer.website).toEqual(data.invoice.buyer.website);
    });

    it("returns Invoice aggregate with seller as Company instance", () => {
      expect(invoice.seller).toBeInstanceOf(Company);
    });

    it("returns Invoice aggregate with aggregated seller details as in params", () => {
      expect(invoice.seller.address).toEqual(data.invoice.seller.address);
      expect(invoice.seller.email).toEqual(data.invoice.seller.email);
      expect(invoice.seller.name).toEqual(data.invoice.seller.name);
      expect(invoice.seller.taxPayerNumber).toEqual(data.invoice.seller.taxPayerNumber);
      expect(invoice.seller.telephone).toEqual(data.invoice.seller.telephone);
      expect(invoice.seller.website).toEqual(data.invoice.seller.website);
    });

    it("returns Invoice aggregate with order as Order instance", () => {
      expect(invoice.order).toBeInstanceOf(Order);
    });

    it("returns Invoice aggregate with as much order rows as in params", () => {
      expect(invoice.order.orderRows.length).toEqual(data.invoice.order.length);
    });

    it("returns Invoice aggregate with order rows aggregating Product instances", () => {
      invoice.order.orderRows.forEach(orderRow => {
        expect(orderRow.product).toBeInstanceOf(Product);
      });
    });

    it("returns Invoice aggregate with order details as in params", () => {
      invoice.order.orderRows.forEach((orderRow, index) => {
        expect(orderRow.quantity).toEqual(
          data.invoice.order[index].quantity,
          `Quantity of order ${index} does not match.`
        );
        expect(orderRow.product.name).toEqual(
          data.invoice.order[index].product.name,
          `Name of the product ${index} does not match.`
        );
        expect(orderRow.product.netPrice).toEqual(
          data.invoice.order[index].product.netPrice,
          `Net price of the product ${index} does not match.`
        );
        expect(orderRow.product.valueAddedTax).toEqual(
          data.invoice.order[index].product.valueAddedTax,
          `Value added tax of the product ${index} does not match.`
        );
        expect(orderRow.product.position).toEqual(
          data.invoice.order[index].product.position,
          `Position of the product ${index} does not match.`
        );
      });
    });
  });
});
