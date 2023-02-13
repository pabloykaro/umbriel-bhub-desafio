import { ActiveClientUseCase } from "@application/use-cases/active-client-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { ActiveClientController } from "../controllers/active-client-controller";

const prismaClientRepository = new PrismaClientRepository();
const activeClientUseCase = new ActiveClientUseCase(prismaClientRepository);
const activeClientController = new ActiveClientController(activeClientUseCase);

export { activeClientController, activeClientUseCase };
