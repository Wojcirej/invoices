import express from "express";
import { postNewInvoice } from "../actions/Invoices/postNewInvoice";
import { getInvoice } from "../actions/Invoices/getInvoice";
import { getAllInvoices } from "../actions/Invoices/getAllInvoices";
import { editInvoice } from "../actions/Invoices/editInvoice";

const router = express.Router();

router.post("/new", postNewInvoice);
router.get("/:id", getInvoice);
router.get("/", getAllInvoices);
router.patch("/:id", editInvoice);

export { router };
