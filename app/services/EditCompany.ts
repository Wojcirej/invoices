import { CompanyEvent } from "../events/Companies/CompanyEvent";
import { Company } from "../../domain/Companies/Company";
import { CompanyUpdated } from "../events/Companies/CompanyUpdated";
import { CompanyNotUpdated } from "../events/Companies/CompanyNotUpdated";

export class EditCompany {
  private readonly companyId: string;
  private readonly data;
  private readonly companyRepository;
  constructor(companyId, data, companyRepository) {
    this.companyId = companyId;
    this.data = data;
    this.companyRepository = companyRepository;
  }

  static call(companyId, data, companyRepository): CompanyEvent {
    return new EditCompany(companyId, data, companyRepository).call();
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
