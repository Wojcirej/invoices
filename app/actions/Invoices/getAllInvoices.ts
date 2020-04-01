import { fetchAllInvoices } from "../../services/fetchAllInvoices";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";

export const getAllInvoices = async (req, res) => {
  const invoices = fetchAllInvoices(new InvoiceRepository());
  res.status(200).json(invoices);
};
