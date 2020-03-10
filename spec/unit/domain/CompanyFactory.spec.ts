import { CompanyFactory } from "../../../domain/Invoices/factories/CompanyFactory";
import { Company } from "../../../domain/Invoices/Company";
import { v4 as isUUIDv4 } from "is-uuid";
import { v4 as uuid } from "uuid";

describe("CompanyFactory", () => {
  describe(".build()", () => {
    const data = {
      id: uuid(),
      name: "Name",
      address: "Here",
      taxPayerNumber: "123-456-78",
      telephone: "12345678",
      website: "www.example.com",
      email: "email@example.com"
    };

    it("returns instance of Company", () => {
      const company = CompanyFactory.build(data);
      expect(company).toBeInstanceOf(Company);
    });

    describe("when any values under acceptable keys passed", () => {
      it("returns instance of Company with ID as provided UUID", () => {
        const company = CompanyFactory.build(data);
        expect(company.id).toBeTruthy("Company's ID is empty");
        expect(isUUIDv4(company.id)).toBe(true);
        expect(company.id).toEqual(data.id);
      });

      it("returns instance of Company with passed data", () => {
        const company = CompanyFactory.build(data);
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
        id: null,
        name: null,
        address: null,
        taxPayerNumber: null,
        telephone: null,
        website: null,
        email: null
      };

      it("returns instance of Company with randomly generated valid UUID", () => {
        const company = CompanyFactory.build(data);
        expect(company.id).toBeTruthy("Company's ID is empty");
        expect(isUUIDv4(company.id)).toBe(true);
      });

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
