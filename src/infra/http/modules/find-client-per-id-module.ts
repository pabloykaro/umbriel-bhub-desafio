import { FindClientPerIdUseCase } from "@application/use-cases/find-client-per-id-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { FindClientPerIdController } from "../controllers/find-client-per-id-controller";

const prismaClientRepository = new PrismaClientRepository();
const findClientPerIdUseCase = new FindClientPerIdUseCase(
  prismaClientRepository
);
const findClientPerIdController = new FindClientPerIdController(
  findClientPerIdUseCase
);

export { findClientPerIdUseCase, findClientPerIdController };
