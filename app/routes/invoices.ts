import express from "express";
import { postNewInvoice } from "../actions/Invoices/postNewInvoice";
import { getInvoice } from "../actions/Invoices/getInvoice";

const router = express.Router();

router.post("/new", postNewInvoice);
router.get("/:id", getInvoice);

export { router };
