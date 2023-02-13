import { DisableClientUseCase } from "@application/use-cases/disable-client-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { DisableClientController } from "../controllers/disable-client-controller";

const prismaClientRepository = new PrismaClientRepository();
const disableClientUseCase = new DisableClientUseCase(prismaClientRepository);
const disableClientController = new DisableClientController(
  disableClientUseCase
);

export { disableClientController, disableClientUseCase };
