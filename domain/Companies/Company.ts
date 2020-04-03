import { CompanyConstructorParams } from "./CompanyConstructorParams";

export class Company {
  public readonly id: string;
  public name: string;
  public address: string;
  public taxPayerNumber: string;
  public telephone: string;
  public website: string;
  public email: string;
  public readonly errors;

  constructor(companyDetails: CompanyConstructorParams) {
    this.id = companyDetails.id;
    this.name = companyDetails.name;
    this.address = companyDetails.address;
    this.taxPayerNumber = companyDetails.taxPayerNumber;
    this.telephone = companyDetails.telephone;
    this.website = companyDetails.website;
    this.email = companyDetails.email;
    this.errors = {};
  }

  isValid(): boolean {
    this.isValidString(this.name);
    this.isValidString(this.address);
    this.isValidString(this.taxPayerNumber);
    this.isValidString(this.telephone);
    this.isValidString(this.website);
    this.isValidEmail();
    return Object.keys(this.errors).length === 0;
  }

  private isValidEmail() {
    const result = this.isValidString(this.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    if (result) return true;
    this.errors["email"] = "Invalid format";
    return false;
  }

  private isValidString(value): boolean {
    return !!value && typeof value === "string" && value.length > 0;
  }
}
