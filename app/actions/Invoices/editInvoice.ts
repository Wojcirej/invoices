import { EditInvoice } from "../../services/EditInvoice";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";

export const editInvoice = async (req, res) => {
  try {
    const invoice = EditInvoice.call(req.params.id, req.body, new InvoiceRepository());
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
