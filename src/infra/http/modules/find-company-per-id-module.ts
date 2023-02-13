import { FindCompanyPerIdUseCase } from "@application/use-cases/find-company-per-id-use-case";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { FindCompanyPerIdController } from "../controllers/find-company-per-id-controller";

const prismaCompanyRepository = new PrismaCompanyRepository();
const findCompanyPerIdUseCase = new FindCompanyPerIdUseCase(
  prismaCompanyRepository
);
const findCompanyPerIdController = new FindCompanyPerIdController(
  findCompanyPerIdUseCase
);

export { findCompanyPerIdUseCase, findCompanyPerIdController };
