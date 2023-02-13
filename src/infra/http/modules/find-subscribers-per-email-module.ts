import { FindSubscriberPerEmailUseCase } from "@application/use-cases/find-subscribers-per-email-use-case";
import { PrismaSubscriberRepository } from "@infra/database/prisma/repositories/prisma-subscriber-repository";
import { FindSubscribePerEmailController } from "../controllers/find-subscribers-per-email-controller";

const prismaSubscriberRepository = new PrismaSubscriberRepository();
const findSubscriberPerEmailUseCase = new FindSubscriberPerEmailUseCase(
  prismaSubscriberRepository
);
const findSubscribePerEmailController = new FindSubscribePerEmailController(
  findSubscriberPerEmailUseCase
);

export { findSubscriberPerEmailUseCase, findSubscribePerEmailController };
