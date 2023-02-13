import { CnpjNumber } from "@application/entities/value-objects/cnpj-number";
import { DeclaredBilling } from "@application/entities/value-objects/declared-billing";
import { IdClient } from "@application/entities/value-objects/id-client";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";
import { ClientRepository } from "@application/repositories/client-repository";
import { CompanyRepository } from "@application/repositories/company-repository";
import { Company } from "../entities/company";
import { AlreadyExist } from "./errors/already-exist";
import { NotFound } from "./errors/not-found";

interface CreateCompanyRequest {
  idClient: string;
  cnpjNumber: string;
  cnpjAddress: string;
  cnpjPhone: string;
  declaredBilling: number;
}

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private clientRepository: ClientRepository
  ) {}
  async execute(data: CreateCompanyRequest) {
    const company = await this.companyRepository.findByCnpjNumber(
      data.cnpjNumber
    );
    const client = await this.clientRepository.findById(data.idClient);

    if (!client) throw new NotFound("Client not found.");
    if (company) throw new AlreadyExist("Company exist.");
    const companyEntity = new Company({
      idClient: new IdClient(data.idClient),
      cnpjNumber: new CnpjNumber(data.cnpjNumber),
      cnpjAddress: new NameAddress(data.cnpjAddress),
      cnpjPhone: new NumberPhone(data.cnpjPhone),
      declaredBilling: new DeclaredBilling(data.declaredBilling),
    });
    await this.companyRepository.create(companyEntity);
    return {
      companyEntity,
    };
  }
}
