import { FindCompanyPerIdClientUseCase } from "@application/use-cases/find-company-per-id-client-use-case";
import { PrismaCompanyRepository } from "@infra/database/prisma/repositories/prisma-company-repository";
import { FindCompanyPerIdClientController } from "../controllers/find-company-per-id-client-controller";

const prismaCompanyRepository = new PrismaCompanyRepository();
const findCompanyPerIdClientUseCase = new FindCompanyPerIdClientUseCase(
  prismaCompanyRepository
);
const findCompanyPerIdClientController = new FindCompanyPerIdClientController(
  findCompanyPerIdClientUseCase
);

export { findCompanyPerIdClientUseCase, findCompanyPerIdClientController };
