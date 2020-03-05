import { CreateNewInvoice } from "../../services/CreateNewInvoice";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";

const postNewInvoice = async (req, res) => {
  const invoice = CreateNewInvoice.call(req.body, new InvoiceRepository());
  res.status(201).json(invoice);
};

export { postNewInvoice };
