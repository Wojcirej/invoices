import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { mapErrorToApiResponse } from "../../utils/mapErrorToApiResponse";
import { CompanyDto } from "../../dto/CompanyDto";

export const getCompany = async (req, res) => {
  const repository = new CompanyRepository();
  try {
    const company = new CompanyDto(repository.find(req.params.id));
    res.status(200).json(company);
  } catch (error) {
    const { status, message } = mapErrorToApiResponse(error);
    res.status(status).json({ message });
  }
};
