import { CreateCompanyUseCase } from "@application/use-cases/create-company-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { CreateCompanyController } from "../controllers/create-company-controller";

const prismaClientRepository = new PrismaClientRepository();
const prismaCompanyRepository = new PrismaCompanyRepository();
const createCompanyUseCase = new CreateCompanyUseCase(
  prismaCompanyRepository,
  prismaClientRepository
);
const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
);

export { createCompanyUseCase, createCompanyController };
