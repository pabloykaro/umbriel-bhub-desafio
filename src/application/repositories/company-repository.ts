import { Company } from "@application/entities/company";

export abstract class CompanyRepository {
  abstract findById(idCompany: string): Promise<Company | null>;
  abstract findByIdClient(idClient: string): Promise<Company[] | null>;
  abstract findByCnpjNumber(cnpjNumber: string): Promise<Company | null>;
  abstract findManyCompany(): Promise<Company[] | null>;
  abstract create(company: Company): Promise<void>;
  abstract save(company: Company): Promise<void>;
  abstract delete(idCompany: string): Promise<void>;
}
