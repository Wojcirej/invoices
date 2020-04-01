import { EditInvoice } from "../../services/EditInvoice";
import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";

export const editInvoice = async (req, res) => {
  try {
    const invoice = EditInvoice.call(req.params.id, req.body, new InvoiceRepository());
    res.status(200).json(invoice);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
