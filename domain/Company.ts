import { CompanyConstructorParams } from "./lib/interfaces";

export class Company {
  private name: string;
  private address: string;
  private taxPayerNumber: string;
  private telephone: string;
  private website: string;
  private email: string;

  constructor(companyDetails: CompanyConstructorParams) {
    this.name = companyDetails.name;
    this.address = companyDetails.address;
    this.taxPayerNumber = companyDetails.taxPayerNumber;
    this.telephone = companyDetails.telephone;
    this.website = companyDetails.website;
    this.email = companyDetails.email;
  }
}
