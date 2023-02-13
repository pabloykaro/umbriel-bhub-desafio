import { DeleteClientUseCase } from "@application/use-cases/delete-client-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { DeleteClientController } from "../controllers/delete-client-controller";

const prismaClientRepository = new PrismaClientRepository();
const deleteClientUseCase = new DeleteClientUseCase(prismaClientRepository);
const deleteClientController = new DeleteClientController(deleteClientUseCase);

export { deleteClientUseCase, deleteClientController };
