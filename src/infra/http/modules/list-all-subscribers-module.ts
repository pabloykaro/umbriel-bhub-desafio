import { ListAllSubscribersUseCase } from "@application/use-cases/list-all-subscribers-use-case";
import { PrismaSubscriberRepository } from "@infra/database/prisma/repositories/prisma-subscriber-repository";
import { ListAllSubscribersController } from "../controllers/list-all-subscribers-controller";

const prismaSubscriberRepository = new PrismaSubscriberRepository();
const listAllSubscribersUseCase = new ListAllSubscribersUseCase(
  prismaSubscriberRepository
);
const listAllSubscribersController = new ListAllSubscribersController(
  listAllSubscribersUseCase
);

export { listAllSubscribersController, listAllSubscribersUseCase };
