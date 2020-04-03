import { CompanyFactory } from "../../../domain/Companies/CompanyFactory";
import { Company } from "../../../domain/Companies/Company";
import { v4 as isUUIDv4 } from "is-uuid";

describe("CompanyFactory", () => {
  describe(".build()", () => {
    describe("when no param passed", () => {
      it("returns instance of Company", () => {
        const company = CompanyFactory.build();
        expect(company).toBeInstanceOf(Company);
      });

      it("returns valid instance of Company", () => {
        const company = CompanyFactory.build();
        expect(company.isValid()).toBe(true);
      });

      it("returns instance of Company with ID being valid UUID", () => {
        const company = CompanyFactory.build();
        expect(company.id).toBeTruthy("Company's ID is empty");
        expect(isUUIDv4(company.id)).toBe(true);
      });
    });

    describe("when object with any properties passed", () => {
      const data = {
        name: "Name",
        address: "Here",
        taxPayerNumber: "123-456-78",
        telephone: undefined,
        website: null,
        email: "email@example.com"
      };

      it("returns instance of Company", () => {
        const company = CompanyFactory.build(data);
        expect(company).toBeInstanceOf(Company);
      });

      it("returns instance of Company with matched values", () => {
        const company = CompanyFactory.build(data);
        expect(company.name).toEqual(data.name);
        expect(company.address).toEqual(data.address);
        expect(company.taxPayerNumber).toEqual(data.taxPayerNumber);
        expect(company.telephone).toEqual(data.telephone);
        expect(company.website).toEqual(data.website);
        expect(company.email).toEqual(data.email);
      });
    });
  });
});
