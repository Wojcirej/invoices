import { CompanyEvent } from "../events/Companies/CompanyEvent";
import { CompanyFactory } from "../../domain/Companies/CompanyFactory";
import { CompanyCreated } from "../events/Companies/CompanyCreated";
import { CompanyNotCreated } from "../events/Companies/CompanyNotCreated";

export class CreateCompany {
  private readonly data;
  private readonly companyRepository;

  constructor(data, companyRepository) {
    this.data = data;
    this.companyRepository = companyRepository;
  }

  public static call(data, companyRepository): CompanyEvent {
    return new CreateCompany(data, companyRepository).call();
  }

  public call(): CompanyEvent {
    const company = CompanyFactory.build(this.data);
    if (company.isValid()) {
      this.companyRepository.save(company);
      return new CompanyCreated(company);
    }
    return new CompanyNotCreated(company);
  }
}
