import { ListAllClientsUseCase } from "@application/use-cases/list-all-clients-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { ListAllClientsController } from "../controllers/list-all-clients-controller";

const prismaClientRepository = new PrismaClientRepository();
const listAllClientsUseCase = new ListAllClientsUseCase(prismaClientRepository);
const listAllClientsController = new ListAllClientsController(
  listAllClientsUseCase
);

export { listAllClientsController, listAllClientsUseCase };
