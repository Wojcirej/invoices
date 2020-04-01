import fs from "fs";
import path from "path";
import { Company } from "./Company";
import { CompanyNotFoundError } from "./errors/CompanyNotFoundError";
import { CompanyNotDeletedError } from "./errors/CompanyNotDeletedError";

export class CompanyRepository {
  public readonly path: string;

  constructor() {
    this.path = path.join(process.cwd(), "/tmp/db/companies");
  }

  save(company: Company): boolean {
    fs.writeFileSync(`${this.path}/${company.id}.json`, JSON.stringify(company, null, 2));
    return true;
  }

  find(companyId: string): Company {
    const all = this.findAll();
    const company = all.find(company => company.id === companyId);
    if (!company) {
      throw new CompanyNotFoundError(`Company with id ${companyId} does not exist.`);
    }
    return company;
  }

  findAll(): Array<Company> {
    const all = fs.readdirSync(this.path);
    return all.map(companyEntry => {
      const company = JSON.parse(fs.readFileSync(`${this.path}/${companyEntry}`).toString());
      const { id, name, address, taxPayerNumber, telephone, website, email } = company;
      return new Company({
        id,
        name,
        address,
        taxPayerNumber,
        telephone,
        website,
        email
      });
    });
  }

  destroy(companyId: string): Company {
    const all = this.findAll();
    const company = all.find(company => company.id === companyId);
    if (!company) {
      throw new CompanyNotFoundError(`Company with id ${companyId} does not exist.`);
    } else {
      fs.unlinkSync(`${this.path}/${company.id}.json`);
    }
    if (fs.existsSync(`${this.path}/${company.id}.json`)) {
      throw new CompanyNotDeletedError(`Company with id ${companyId} couldn't be deleted.`);
    }
    return company;
  }
}
