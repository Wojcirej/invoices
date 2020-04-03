import { Company } from "../../domain/Companies/Company";

export class InvalidCompanyDto {
  public readonly id: string;
  public readonly name: string;
  public readonly address: string;
  public readonly taxPayerNumber: string;
  public readonly telephone: string;
  public readonly website: string;
  public readonly email: string;
  public readonly errors;
  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.address = company.address;
    this.taxPayerNumber = company.taxPayerNumber;
    this.telephone = company.telephone;
    this.website = company.website;
    this.email = company.email;
    this.errors = company.errors;
  }
}
