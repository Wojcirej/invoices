import { CompanyRepository } from "../../../../domain/Companies/CompanyRepository";
import { CreateCompany } from "../../../../domain/Companies/services/CreateCompany";
import { CompanyCreated } from "../../../../domain/Companies/events/CompanyCreated";
import { CompanyNotCreated } from "../../../../domain/Companies/events/CompanyNotCreated";

describe("CreateCompany", () => {
  const repository = new CompanyRepository();

  describe(".call", () => {
    describe("when valid data", () => {
      const data = {
        name: "New",
        address: "Completely new",
        taxPayerNumber: "1223-451-12",
        telephone: "123 456 789",
        website: "www.example.com",
        email: "mail@example.com"
      };

      it("returns instance of CompanyCreated event", () => {
        expect(CreateCompany.call(data, repository)).toBeInstanceOf(CompanyCreated);
      });

      it("returns instance of CompanyCreated event indicating successful action", () => {
        expect(CreateCompany.call(data, repository).isSuccess()).toBe(true);
      });
    });

    describe("when invalid data", () => {
      const data = {
        name: null,
        address: "Completely new",
        taxPayerNumber: "1223-451-12",
        telephone: "123 456 789",
        website: "www.example.com",
        email: "mail[at]example.com"
      };

      it("returns instance of CompanyNotCreated event", () => {
        expect(CreateCompany.call(data, repository)).toBeInstanceOf(CompanyNotCreated);
      });

      it("returns instance of CompanyNotCreated event indicating not successful action", () => {
        expect(CreateCompany.call(data, repository).isSuccess()).toBe(false);
      });
    });
  });
});
