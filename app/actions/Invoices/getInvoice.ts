import { InvoiceRepository } from "../../../domain/Invoices/repositories/InvoiceRepository";
import { GetInvoice } from "../../services/GetInvoice";
import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";

export const getInvoice = async (req, res) => {
  try {
    const invoice = GetInvoice.call(req.params.id, new InvoiceRepository());
    res.status(200).json(invoice);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
