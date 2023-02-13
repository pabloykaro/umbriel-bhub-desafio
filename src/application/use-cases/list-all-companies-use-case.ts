import { CompanyRepository } from "@application/repositories/company-repository";
import { NotFound } from "./errors/not-found";

export class ListAllCompaniesUseCase {
  constructor(private companyRepository: CompanyRepository) {}
  async execute() {
    const listOfCompanies = await this.companyRepository.findManyCompany();
    if (!listOfCompanies) throw new NotFound("companies");

    return {
      listOfCompanies,
    };
  }
}
