import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";
import { fetchCompany } from "../../../domain/Companies/services/fetchCompany";

export const getCompany = async (req, res) => {
  try {
    const company = fetchCompany(req.params.id, new CompanyRepository());
    res.status(200).json(company);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
