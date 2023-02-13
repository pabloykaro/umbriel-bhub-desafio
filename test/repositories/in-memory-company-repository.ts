import { Company } from "@application/entities/company";
import { CompanyRepository } from "@application/repositories/company-repository";

export class InMemoryCompanyRepository implements CompanyRepository {
  public company: Company[] = [];

  async findByIdClient(idClient: string): Promise<Company[] | null> {
    const company = this.company.filter(
      (item) => item.idClient.value === idClient
    );
    if (!company) return null;

    const listCompanies = company.map(
      (item) =>
        new Company({
          idCompany: item.idCompany,
          idClient: item.idClient,
          cnpjNumber: item.cnpjNumber,
          cnpjAddress: item.cnpjAddress,
          cnpjPhone: item.cnpjPhone,
          declaredBilling: item.declaredBilling,
          statusCompany: item.statusCompany,
          createAt: item.createAt,
          updateAt: item.updateAt,
        })
    );
    return listCompanies;
  }

  async findByCnpjNumber(cnpjNumber: string): Promise<Company | null> {
    const company = this.company.find(
      (item) => item.cnpjNumber.value === cnpjNumber
    );

    if (!company) {
      return null;
    }

    return company;
  }

  async findManyCompany(): Promise<Company[] | null> {
    const listManyCompanies = this.company.filter((item) => item);
    if (!listManyCompanies) return null;
    return listManyCompanies;
  }

  async findById(idCompany: string): Promise<Company | null> {
    const company = this.company.find((item) => item.idCompany === idCompany);

    if (!company) {
      return null;
    }

    return company;
  }

  async create(company: Company) {
    this.company.push(company);
  }

  async save(company: Company): Promise<void> {
    const companyIndex = this.company.findIndex(
      (item) => item.idCompany === company.idCompany
    );

    if (companyIndex >= 0) {
      this.company[companyIndex] = company;
    }
  }

  async delete(idCompany: string): Promise<void> {
    const company = this.company.findIndex(
      (item) => item.idCompany === idCompany
    );
    if (company >= 0) {
      this.company.splice(company, 1);
    }
  }
}
