import fs from "fs";

import { CompanyRepository } from "../../../domain/Companies/CompanyRepository";
import { invoicePayload } from "../../support/mocks/payloadSamples";
import { CompanyFactory } from "../../../domain/Companies/CompanyFactory";
import { Company } from "../../../domain/Companies/Company";

describe("CompanyRepository", () => {
  const repository = new CompanyRepository();

  describe("#save", () => {
    describe("when success", () => {
      const company = CompanyFactory.build(invoicePayload.invoice.seller);

      afterAll(() => {
        repository.destroy(company.id);
      });

      it("returns true", () => {
        expect(repository.save(company)).toBe(true);
      });

      it("saves passed object as JSON file in specified directory", () => {
        repository.save(company);
        expect(fs.existsSync(`${repository.path}/${company.id}.json`)).toBe(true);
      });
    });
  });

  describe("#findAll", () => {
    it("returns list of the Company objects", () => {
      const allCompanies = repository.findAll();
      expect(allCompanies.every(company => company instanceof Company)).toBe(true);
    });
  });

  describe("#find", () => {
    describe("when Company with provided ID exists", () => {
      const company = CompanyFactory.build();
      repository.save(company);

      afterAll(() => {
        repository.destroy(company.id);
      });

      it("returns Company instance", () => {
        const foundCompany = repository.find(company.id);
        expect(foundCompany).toBeInstanceOf(Company);
      });

      it("returns Company instance with provided ID", () => {
        const foundCompany = repository.find(company.id);
        expect(foundCompany.id).toEqual(company.id);
      });
    });

    describe("when Company with provided ID does not exist", () => {
      const companyId = "0";

      it("throws CompanyNotFoundError", () => {
        try {
          repository.find(companyId);
        } catch (error) {
          expect(error.name).toEqual("CompanyNotFoundError");
          expect(error.message).toEqual(`Company with id ${companyId} does not exist.`);
        }
      });
    });
  });

  describe("#destroy", () => {
    describe("when Company with provided ID exists", () => {
      let companyId;

      beforeEach(() => {
        const company = CompanyFactory.build(invoicePayload.invoice.seller);
        repository.save(company);
        companyId = company.id;
      });

      it("returns Company instance", () => {
        expect(repository.destroy(companyId)).toBeInstanceOf(Company);
      });

      it("deletes company with provided ID", () => {
        expect(fs.existsSync(`${repository.path}/${companyId}.json`)).toBe(true);
        repository.destroy(companyId);
        expect(fs.existsSync(`${repository.path}/${companyId}.json`)).toBe(false);
      });
    });

    describe("when Company with provided ID does not exist", () => {
      const companyId = "0";

      it("throws CompanyNotFoundError", () => {
        try {
          repository.find(companyId);
        } catch (error) {
          expect(error.name).toEqual("CompanyNotFoundError");
          expect(error.message).toEqual(`Company with id ${companyId} does not exist.`);
        }
      });
    });
  });
});
