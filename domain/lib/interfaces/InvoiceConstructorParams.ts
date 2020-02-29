import { Order } from "../../Order";
import { Company } from "../../Company";
import { InvoiceDetails } from "./InvoiceDetails";

export interface InvoiceConstructorParams {
  invoiceDetails: InvoiceDetails;
  seller: Company;
  buyer: Company;
  order: Order;
}
