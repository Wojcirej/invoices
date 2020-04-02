import { CompanyConstructorParams } from "./CompanyConstructorParams";

export class Company {
  public readonly id: string;
  public name: string;
  public address: string;
  public taxPayerNumber: string;
  public telephone: string;
  public website: string;
  public email: string;

  constructor(companyDetails: CompanyConstructorParams) {
    this.id = companyDetails.id;
    this.name = companyDetails.name;
    this.address = companyDetails.address;
    this.taxPayerNumber = companyDetails.taxPayerNumber;
    this.telephone = companyDetails.telephone;
    this.website = companyDetails.website;
    this.email = companyDetails.email;
  }
}
