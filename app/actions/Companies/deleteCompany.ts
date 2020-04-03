import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";
import { DeleteCompany } from "../../../domain/Companies/services/DeleteCompany";

export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = DeleteCompany.call(req.params.id, new CompanyRepository());
    res.status(200).json(deletedCompany);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
