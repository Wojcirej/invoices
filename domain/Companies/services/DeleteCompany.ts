import { Company } from "../Company";
import { CompanyDto } from "../dto/CompanyDto";

export class DeleteCompany {
  private readonly companyId: string;
  private readonly companyRepository;

  constructor(companyId, companyRepository) {
    this.companyId = companyId;
    this.companyRepository = companyRepository;
  }

  public static call(companyId, companyRepository): CompanyDto {
    return new DeleteCompany(companyId, companyRepository).call();
  }

  public call(): CompanyDto {
    const company: Company = this.companyRepository.destroy(this.companyId);
    return new CompanyDto(company);
  }
}
