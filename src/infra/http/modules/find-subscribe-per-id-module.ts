import { FindSubscriberPerIdUseCase } from "@application/use-cases/find-subscriber-per-id-use-case";
import { PrismaSubscriberRepository } from "@infra/database/prisma/repositories/prisma-subscriber-repository";
import { FindSubscribePerIdController } from "../controllers/find-subscribe-per-id-controller";

const prismaSubscriberRepository = new PrismaSubscriberRepository();
const findSubscriberPerIdUseCase = new FindSubscriberPerIdUseCase(
  prismaSubscriberRepository
);
const findSubscribePerIdController = new FindSubscribePerIdController(
  findSubscriberPerIdUseCase
);

export { findSubscriberPerIdUseCase, findSubscribePerIdController };
