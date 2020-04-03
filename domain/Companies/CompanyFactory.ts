import faker from "faker";
import { v4 as uuid } from "uuid";

import { Company } from "./Company";

export class CompanyFactory {
  private readonly id: string;
  private readonly name: string;
  private readonly address: string;
  private readonly taxPayerNumber: string;
  private readonly telephone: string;
  private readonly website: string;
  private readonly email: string;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.taxPayerNumber = data.taxPayerNumber;
    this.telephone = data.telephone;
    this.website = data.website;
    this.email = data.email;
  }

  static build(data = {}): Company {
    const id = uuid();
    if (Object.keys(data).length === 0) {
      return new CompanyFactory({
        id,
        name: faker.company.companyName(),
        address: faker.address.country(),
        taxPayerNumber: "123-45-67-819",
        telephone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        email: faker.internet.email()
      }).build();
    }
    const object = Object.assign({ id }, data);
    return new CompanyFactory(object).build();
  }

  build(): Company {
    return new Company({
      id: this.id,
      name: this.name,
      address: this.address,
      taxPayerNumber: this.taxPayerNumber,
      telephone: this.telephone,
      website: this.website,
      email: this.email
    });
  }
}
