import { CompanyConstructorParams } from "./lib/interfaces";

export class Company {
  public readonly name: string;
  public readonly address: string;
  public readonly taxPayerNumber: string;
  public readonly telephone: string;
  public readonly website: string;
  public readonly email: string;

  constructor(companyDetails: CompanyConstructorParams) {
    this.name = companyDetails.name;
    this.address = companyDetails.address;
    this.taxPayerNumber = companyDetails.taxPayerNumber;
    this.telephone = companyDetails.telephone;
    this.website = companyDetails.website;
    this.email = companyDetails.email;
  }
}
