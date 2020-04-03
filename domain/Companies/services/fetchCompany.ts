import { CompanyDto } from "../dto/CompanyDto";

export const fetchCompany = (companyId, companyRepository): CompanyDto => {
  return new CompanyDto(companyRepository.find(companyId));
};
