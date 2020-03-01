import faker from "faker";

import { Company } from "../Company";
import { CompanyConstructorParams } from "../lib/interfaces";

export class CompanyFactory {
  private readonly name: string;
  private readonly address: string;
  private readonly taxPayerNumber: string;
  private readonly telephone: string;
  private readonly website: string;
  private readonly email: string;

  constructor(data: CompanyConstructorParams) {
    this.name = data.name || faker.company.companyName();
    this.address = data.address || faker.address.country();
    this.taxPayerNumber = data.taxPayerNumber || "123-45-67-819";
    this.telephone = data.telephone || faker.phone.phoneNumber();
    this.website = data.website || faker.internet.url();
    this.email = data.email || faker.internet.email();
  }

  static build(data: CompanyConstructorParams): Company {
    return new CompanyFactory(data).build();
  }

  build(): Company {
    return new Company({
      name: this.name,
      address: this.address,
      taxPayerNumber: this.taxPayerNumber,
      telephone: this.telephone,
      website: this.website,
      email: this.email
    });
  }
}
