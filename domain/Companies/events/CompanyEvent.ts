import { Company } from "../Company";

export abstract class CompanyEvent {
  public readonly id: string;
  public readonly name: string;
  public readonly address: string;
  public readonly taxPayerNumber: string;
  public readonly telephone: string;
  public readonly website: string;
  public readonly email: string;

  public abstract isSuccess(): boolean;

  protected constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.address = company.address;
    this.taxPayerNumber = company.taxPayerNumber;
    this.telephone = company.telephone;
    this.website = company.website;
    this.email = company.email;
  }
}
