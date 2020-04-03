import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { fetchAllCompanies } from "../../services/fetchAllCompanies";

export const getAllCompanies = async (req, res) => {
  const companies = fetchAllCompanies(new CompanyRepository());
  res.status(200).json(companies);
};
