import { CompanyEvent } from "./CompanyEvent";
import { Company } from "../../../domain/Companies/Company";

export class CompanyUpdated extends CompanyEvent {
  constructor(company: Company) {
    super(company);
  }

  public isSuccess(): boolean {
    return true;
  }
}
