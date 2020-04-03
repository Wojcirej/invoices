import { CompanyDto } from "../dto/CompanyDto";

export class EditCompany {
  private readonly companyId: string;
  private readonly data;
  private readonly companyRepository;
  constructor(companyId, data, companyRepository) {
    this.companyId = companyId;
    this.data = data;
    this.companyRepository = companyRepository;
  }

  static call(companyId, data, companyRepository): CompanyDto {
    return new EditCompany(companyId, data, companyRepository).call();
  }

  call(): CompanyDto {
    const company = this.companyRepository.find(this.companyId);
    company.name = this.data.name;
    company.address = this.data.address;
    company.taxPayerNumber = this.data.taxPayerNumber;
    company.telephone = this.data.telephone;
    company.website = this.data.website;
    company.email = this.data.email;
    this.companyRepository.save(company);
    return new CompanyDto(company);
  }
}
