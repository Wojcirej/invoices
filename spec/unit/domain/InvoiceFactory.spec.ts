import { v4 as isUUIDv4 } from "is-uuid";

import { InvoiceFactory } from "../../../domain/Invoices/factories/InvoiceFactory";
import { Invoice } from "../../../domain/Invoices/Invoice";
import InvoiceStatuses from "../../../domain/Invoices/lib/InvoiceStatuses";
import { Company } from "../../../domain/Invoices/Company";
import { Order } from "../../../domain/Invoices/Order";
import { Product } from "../../../domain/Invoices/Product";
import { invoicePayload } from "../../support/mocks/payloadSamples";

describe("InvoiceFactory", () => {
  const data = JSON.parse(JSON.stringify(invoicePayload));
  describe(".build", () => {
    let invoice: Invoice;

    beforeAll(() => {
      invoice = InvoiceFactory.build(data);
    });

    it("returns Invoice aggregate", () => {
      expect(invoice).toBeInstanceOf(Invoice);
    });

    it("returns Invoice aggregate with invoice with new valid UUID as ID", () => {
      expect(invoice.id).toBeTruthy("Invoice ID is empty.");
      expect(isUUIDv4(invoice.id)).toBe(true);
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
      expect(invoice.status).toEqual(InvoiceStatuses.New);
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
