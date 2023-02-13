import { ChangeClientUseCase } from "@application/use-cases/change-client-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { ChangeClientController } from "../controllers/change-client-controller";

const prismaClientRepository = new PrismaClientRepository();
const changeClientUseCase = new ChangeClientUseCase(prismaClientRepository);
const changeClientController = new ChangeClientController(changeClientUseCase);

export { changeClientController, changeClientUseCase };
