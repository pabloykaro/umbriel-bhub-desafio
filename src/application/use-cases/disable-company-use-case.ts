import { CompanyRepository } from "@application/repositories/company-repository";
import { AlreadyDisabled } from "./errors/already-disabled";
import { NotFound } from "./errors/not-found";

export class DisableCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}
  async execute(idCompany: string) {
    const company = await this.companyRepository.findById(idCompany);
    if (!company) throw new NotFound("company");
    if (company?.statusCompany === "disabled")
      throw new AlreadyDisabled("Client already disabled");
    company.disableCompany();
    company.update();
    await this.companyRepository.save(company);
  }
}
