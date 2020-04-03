import { CompanyEvent } from "./CompanyEvent";
import { Company } from "../Company";

export class CompanyNotCreated extends CompanyEvent {
  public readonly errors;
  constructor(company: Company) {
    super(company);
    this.errors = company.errors;
  }

  public isSuccess(): boolean {
    return false;
  }
}
