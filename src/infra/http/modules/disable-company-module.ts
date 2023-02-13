import { DisableCompanyUseCase } from "@application/use-cases/disable-company-use-case";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { DisableCompanyController } from "../controllers/disable-company-controller";

const prismaCompanyRepository = new PrismaCompanyRepository();
const disableCompanyUseCase = new DisableCompanyUseCase(
  prismaCompanyRepository
);
const disableCompanyController = new DisableCompanyController(
  disableCompanyUseCase
);

export { disableCompanyController, disableCompanyUseCase };
