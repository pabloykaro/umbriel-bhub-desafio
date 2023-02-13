import { DeleteCompanyUseCase } from "@application/use-cases/delete-company-use-case";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { DeleteCompanyController } from "../controllers/delete-company-controller";

const prismaCompanyRepository = new PrismaCompanyRepository();
const deleteCompanyUseCase = new DeleteCompanyUseCase(prismaCompanyRepository);
const deleteCompanyController = new DeleteCompanyController(
  deleteCompanyUseCase
);

export { deleteCompanyUseCase, deleteCompanyController };
