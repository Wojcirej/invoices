import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { GetInvoice } from "../../services/GetInvoice";

export const getInvoice = async (req, res) => {
  try {
    const invoice = GetInvoice.call(req.params.id, new InvoiceRepository());
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
