import { CompanyRepository } from "@application/repositories/company-repository";
import { AlreadyActivated } from "./errors/already-activated";
import { NotFound } from "./errors/not-found";

export class ActiveCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}
  async execute(idCompany: string) {
    const company = await this.companyRepository.findById(idCompany);
    if (!company) throw new NotFound("company");
    if (company?.statusCompany === "activated")
      throw new AlreadyActivated("Client already activated");
    company.activeCompany();
    company.update();
    await this.companyRepository.save(company);
  }
}
