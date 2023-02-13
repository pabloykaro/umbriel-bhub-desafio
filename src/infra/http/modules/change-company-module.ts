import { ChangeCompanyUseCase } from "@application/use-cases/change-company-use-case";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { ChangeCompanyController } from "../controllers/change-company-controller";

const prismaCompanyRepository = new PrismaCompanyRepository();
const changeCompanyUseCase = new ChangeCompanyUseCase(prismaCompanyRepository);
const changeCompanyController = new ChangeCompanyController(
  changeCompanyUseCase
);

export { changeCompanyController, changeCompanyUseCase };
