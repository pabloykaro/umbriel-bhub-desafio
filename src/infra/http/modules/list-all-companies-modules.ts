import { ListAllCompaniesUseCase } from "@application/use-cases/list-all-companies-use-case";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { ListAllCompaniesController } from "../controllers/list-all-companies-controller";

const prismaCompanyRepository = new PrismaCompanyRepository();
const listAllCompaniesUseCase = new ListAllCompaniesUseCase(
  prismaCompanyRepository
);
const listAllCompaniesController = new ListAllCompaniesController(
  listAllCompaniesUseCase
);

export { listAllCompaniesController, listAllCompaniesUseCase };
