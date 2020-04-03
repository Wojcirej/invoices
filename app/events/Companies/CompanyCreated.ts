import { CompanyEvent } from "./CompanyEvent";
import { Company } from "../../../domain/Companies/Company";

export class CompanyCreated extends CompanyEvent {
  constructor(company: Company) {
    super(company);
  }

  public isSuccess(): boolean {
    return true;
  }
}
