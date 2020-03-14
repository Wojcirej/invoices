import express from "express";
import { postNewInvoice } from "../actions/Invoices/postNewInvoice";
import { getInvoice } from "../actions/Invoices/getInvoice";
import { getAllInvoices } from "../actions/Invoices/getAllInvoices";

const router = express.Router();

router.post("/new", postNewInvoice);
router.get("/:id", getInvoice);
router.get("/", getAllInvoices);

export { router };
