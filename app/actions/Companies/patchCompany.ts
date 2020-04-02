import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";
import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { EditCompany } from "../../services/EditCompany";

export const patchCompany = async (req, res) => {
  try {
    const company = EditCompany.call(req.params.id, req.body, new CompanyRepository());
    res.status(200).json(company);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
