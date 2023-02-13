import { CreateClientUseCase } from "@application/use-cases/create-client-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { CreateClientController } from "../controllers/create-client-controller";

const prismaClientRepository = new PrismaClientRepository();
const createClientUseCase = new CreateClientUseCase(prismaClientRepository);
const createClientController = new CreateClientController(createClientUseCase);

export { createClientUseCase, createClientController };
