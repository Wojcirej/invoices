import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { CompanyFactory } from "../../../domain/Companies/CompanyFactory";
import { CompanyDto } from "../../dto/CompanyDto";

export const postCompany = async (req, res) => {
  const repository = new CompanyRepository();
  const company = CompanyFactory.build(req.body);
  repository.save(company);
  res.status(201).json(new CompanyDto(company));
};
