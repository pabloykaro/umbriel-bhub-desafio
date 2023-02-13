import { CompanyRepository } from "@application/repositories/company-repository";
import { NotFound } from "./errors/not-found";

export class FindCompanyPerIdClientUseCase {
  constructor(private companyRepository: CompanyRepository) {}
  async execute(idClient: string) {
    const company = await this.companyRepository.findByIdClient(idClient);
    if (!company) throw new NotFound("client is not have company");

    return {
      company,
    };
  }
}
