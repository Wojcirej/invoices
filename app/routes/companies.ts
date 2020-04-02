import express from "express";
import { postCompany } from "../actions/Companies/postCompany";
import { getCompany } from "../actions/Companies/getCompany";
import { getAllCompanies } from "../actions/Companies/getAllCompanies";
import { deleteCompany } from "../actions/Companies/deleteCompany";
import { patchCompany } from "../actions/Companies/patchCompany";
const router = express.Router();

router.get("/:id", getCompany);
router.get("/", getAllCompanies);
router.post("/", postCompany);
router.patch("/:id", patchCompany);
router.delete("/:id", deleteCompany);

export { router };
