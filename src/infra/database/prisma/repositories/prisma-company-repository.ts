import { Company } from "@application/entities/company";
import { CompanyRepository } from "@application/repositories/company-repository";
import { Company as CompanyProps } from "@prisma/client";
import { PrismaCompanyMapper } from "../mappers/prisma-company-mapper";
import { prisma } from "../prisma.connect";
export class PrismaCompanyRepository implements CompanyRepository {
  async findById(idCompany: string): Promise<Company | null> {
    const response = await prisma.company.findUnique({
      where: {
        id: idCompany,
      },
    });
    if (!response) return null;
    return PrismaCompanyMapper.toDomain(response);
  }

  async findByIdClient(idClient: string): Promise<Company[] | null> {
    const response = await prisma.company.findMany({
      where: {
        id_client: idClient,
      },
    });
    if (!response) return null;

    return response.map((company: CompanyProps) =>
      PrismaCompanyMapper.toDomain({
        id: company.id,
        id_client: company.id_client,
        cnpj_number: company.cnpj_number,
        cnpj_address: company.cnpj_address,
        cnpj_phone: company.cnpj_phone,
        status_company: company.status_company,
        declared_billing: company.declared_billing,
        create_at: company.create_at,
        update_at: company.update_at,
      })
    );
  }

  async findManyCompany(): Promise<Company[] | null> {
    const response = await prisma.company.findMany();

    if (!response) return null;
    return response.map(PrismaCompanyMapper.toDomain);
  }

  async findByCnpjNumber(cnpjNumber: string): Promise<Company | null> {
    const response = await prisma.company.findUnique({
      where: {
        cnpj_number: cnpjNumber,
      },
    });
    if (!response) return null;
    return PrismaCompanyMapper.toDomain(response);
  }

  async findManyClient(): Promise<Company[] | null> {
    const response = await prisma.company.findMany();
    if (!response) return null;
    return response.map(PrismaCompanyMapper.toDomain);
  }

  async create(company: Company): Promise<void> {
    const response = PrismaCompanyMapper.toPrisma(company);
    await prisma.company.create({
      data: response,
    });
  }

  async save(company: Company): Promise<void> {
    const response = PrismaCompanyMapper.toPrisma(company);
    await prisma.company.update({
      data: response,
      where: {
        id: company.idCompany,
      },
    });
  }

  async delete(idCompany: string): Promise<void> {
    await prisma.company.delete({
      where: {
        id: idCompany,
      },
    });
  }
}
