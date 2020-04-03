import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { CompanyFactory } from "../../../domain/Companies/CompanyFactory";
import { CompanyDto } from "../../dto/CompanyDto";
import { InvalidCompanyDto } from "../../dto/InvalidCompanyDto";

export const postCompany = async (req, res) => {
  const repository = new CompanyRepository();
  const company = CompanyFactory.build(req.body);
  if (company.isValid()) {
    repository.save(company);
    res.status(201).json(new CompanyDto(company));
  } else {
    res.status(422).json(new InvalidCompanyDto(company));
  }
};
