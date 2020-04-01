import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";

export const getAllCompanies = async (req, res) => {
  const repository = new CompanyRepository();
  res.status(200).json(repository.findAll());
};
