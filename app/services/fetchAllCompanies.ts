import { CompanyDto } from "../dto/CompanyDto";

export const fetchAllCompanies = (companyRepository): Array<CompanyDto> => {
  const companies = companyRepository.findAll();
  return companies.map(company => new CompanyDto(company));
};
