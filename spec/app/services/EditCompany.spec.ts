import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { EditCompany } from "../../../app/services/EditCompany";
import { CompanyFactory } from "../../../domain/Companies/CompanyFactory";
import { Company } from "../../../domain/Companies/Company";

describe("EditCompany", () => {
  const repository = new CompanyRepository();

  describe("call", () => {
    describe("when Company with requested ID does not exist", () => {
      const companyId = "0";

      it("throws CompanyNotFoundError", () => {
        try {
          EditCompany.call(companyId, {}, repository);
        } catch (error) {
          expect(error.name).toEqual("CompanyNotFoundError");
          expect(error.message).toEqual(`Company with id ${companyId} does not exist.`);
        }
      });
    });

    describe("when Company with requested ID exists", () => {
      const company = CompanyFactory.build();
      repository.save(company);
      const data = {
        name: "New",
        address: "Completely new",
        taxPayerNumber: "1223-451-12",
        telephone: "123 456 789",
        website: "www.example.com",
        email: "mail@example.com"
      };

      afterAll(() => {
        repository.destroy(company.id);
      });

      it("returns Company instance", () => {
        const editedCompany = EditCompany.call(company.id, data, repository);
        expect(editedCompany).toBeInstanceOf(Company);
      });

      it("returns Company with edited details", () => {
        const editedCompany = EditCompany.call(company.id, data, repository);
        expect(editedCompany.name).toEqual(data.name);
        expect(editedCompany.address).toEqual(data.address);
        expect(editedCompany.taxPayerNumber).toEqual(data.taxPayerNumber);
        expect(editedCompany.telephone).toEqual(data.telephone);
        expect(editedCompany.website).toEqual(data.website);
        expect(editedCompany.email).toEqual(data.email);
      });
    });
  });
});
