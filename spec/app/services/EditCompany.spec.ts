import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { EditCompany } from "../../../app/services/EditCompany";
import { CompanyFactory } from "../../../domain/Companies/CompanyFactory";
import { CompanyUpdated } from "../../../app/events/Companies/CompanyUpdated";
import { CompanyNotUpdated } from "../../../app/events/Companies/CompanyNotUpdated";

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
      describe("when valid data", () => {
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

        it("returns instance of CompanyUpdated event", () => {
          const editedCompany = EditCompany.call(company.id, data, repository);
          expect(editedCompany).toBeInstanceOf(CompanyUpdated);
        });

        it("returns instance of event indicating successful action", () => {
          expect(EditCompany.call(company.id, data, repository).isSuccess()).toBe(true);
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

      describe("when invalid data", () => {
        const company = CompanyFactory.build();
        repository.save(company);
        const data = {
          name: "New",
          address: "Completely new",
          taxPayerNumber: "1223-451-12",
          telephone: "123 456 789",
          website: "www.example.com",
          email: "mail[at]example.com"
        };

        afterAll(() => {
          repository.destroy(company.id);
        });

        it("returns instance of CompanyNotUpdated event", () => {
          const editedCompany = EditCompany.call(company.id, data, repository);
          expect(editedCompany).toBeInstanceOf(CompanyNotUpdated);
        });

        it("returns instance of event indicating not successful action", () => {
          expect(EditCompany.call(company.id, data, repository).isSuccess()).toBe(false);
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
});
