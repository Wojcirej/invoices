import { CompanyEvent } from "../events/CompanyEvent";
import { Company } from "../Company";
import { CompanyUpdated } from "../events/CompanyUpdated";
import { CompanyNotUpdated } from "../events/CompanyNotUpdated";

export class UpdateCompany {
  private readonly companyId: string;
  private readonly data;
  private readonly companyRepository;
  constructor(companyId, data, companyRepository) {
    this.companyId = companyId;
    this.data = data;
    this.companyRepository = companyRepository;
  }

  static call(companyId, data, companyRepository): CompanyEvent {
    return new UpdateCompany(companyId, data, companyRepository).call();
  }

  call(): CompanyEvent {
    const company: Company = this.companyRepository.find(this.companyId);
    company.name = this.data.name;
    company.address = this.data.address;
    company.taxPayerNumber = this.data.taxPayerNumber;
    company.telephone = this.data.telephone;
    company.website = this.data.website;
    company.email = this.data.email;
    if (company.isValid()) {
      this.companyRepository.save(company);
      return new CompanyUpdated(company);
    }
    return new CompanyNotUpdated(company);
  }
}
