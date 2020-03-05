import express from "express";
import { postNewInvoice } from "../actions/Invoices/postNewInvoice";

const router = express.Router();

router.post("/new", postNewInvoice);

export { router };
