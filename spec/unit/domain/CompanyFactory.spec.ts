import { CompanyFactory } from "../../../domain/factories/CompanyFactory";
import { Company } from "../../../domain/Company";

describe("CompanyFactory", () => {
  describe(".build()", () => {
    describe("when any values under acceptable keys passed", () => {
      const data = {
        name: "Name",
        address: "Here",
        taxPayerNumber: "123-456-78",
        telephone: "12345678",
        website: "www.example.com",
        email: "email@example.com"
      };
      it("returns instance of Company with passed data", () => {
        const company = CompanyFactory.build(data);
        expect(company).toBeInstanceOf(Company);
        expect(company.name).toEqual(data.name);
        expect(company.address).toEqual(data.address);
        expect(company.taxPayerNumber).toEqual(data.taxPayerNumber);
        expect(company.telephone).toEqual(data.telephone);
        expect(company.website).toEqual(data.website);
        expect(company.email).toEqual(data.email);
      });
    });
    describe("when no truthy values passed", () => {
      const data = {
        name: null,
        address: null,
        taxPayerNumber: null,
        telephone: null,
        website: null,
        email: null
      };
      it("returns instance of Company with randomly generated data", () => {
        const company = CompanyFactory.build(data);
        expect(company).toBeInstanceOf(Company);
        expect(company.name).toBeTruthy("Company name is empty");
        expect(company.address).toBeTruthy("Company address is empty");
        expect(company.taxPayerNumber).toBeTruthy("Company tax payer number is empty");
        expect(company.telephone).toBeTruthy("Company telephone is empty");
        expect(company.website).toBeTruthy("Company website is empty");
        expect(company.email).toBeTruthy("Company email is empty");
      });
    });
  });
});
