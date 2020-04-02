import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";

export const deleteCompany = async (req, res) => {
  const repository = new CompanyRepository();
  try {
    const deletedCompany = repository.destroy(req.params.id);
    res.status(200).json(deletedCompany);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};