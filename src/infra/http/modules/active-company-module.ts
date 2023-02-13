import { ActiveCompanyUseCase } from "@application/use-cases/active-company-use-case";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { ActiveCompanyController } from "../controllers/active-company-controller";

const prismaCompanyRepository = new PrismaCompanyRepository();
const activeCompanyUseCase = new ActiveCompanyUseCase(prismaCompanyRepository);
const activeCompanyController = new ActiveCompanyController(
  activeCompanyUseCase
);

export { activeCompanyController, activeCompanyUseCase };
