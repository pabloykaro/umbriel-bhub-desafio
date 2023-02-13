import { Company } from "@application/entities/company";
import { DeclaredBilling } from "@application/entities/value-objects/declared-billing";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";
import { CompanyRepository } from "@application/repositories/company-repository";
import { NotFound } from "./errors/not-found";

interface ChangeCompanyRequest {
  id: string;
  cnpjAddress: string;
  cnpjPhone: string;
  declaredBilling: number;
}

export class ChangeCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}
  async execute(data: ChangeCompanyRequest) {
    const company = await this.companyRepository.findById(data.id);
    if (!company) throw new NotFound("client");

    const entityCompany = new Company({
      idClient: company.idClient,
      idCompany: company.idCompany,
      cnpjNumber: company.cnpjNumber,
      cnpjAddress: new NameAddress(data.cnpjAddress),
      cnpjPhone: new NumberPhone(data.cnpjPhone),
      declaredBilling: new DeclaredBilling(data.declaredBilling),
    });
    entityCompany.update();

    await this.companyRepository.save(entityCompany);
  }
}
