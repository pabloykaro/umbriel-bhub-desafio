import { CompanyRepository } from "@application/repositories/company-repository";
import { NotFound } from "./errors/not-found";

export class FindCompanyPerIdUseCase {
  constructor(private companyRepository: CompanyRepository) {}
  async execute(idCompany: string) {
    const company = await this.companyRepository.findById(idCompany);
    if (!company) throw new NotFound("company");

    return {
      company,
    };
  }
}
