import { CompanyEvent } from "./CompanyEvent";
import { Company } from "../Company";

export class CompanyCreated extends CompanyEvent {
  constructor(company: Company) {
    super(company);
  }

  public isSuccess(): boolean {
    return true;
  }
}
