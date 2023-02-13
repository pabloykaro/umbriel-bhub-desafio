import { CreateSubscriberUseCase } from "@application/use-cases/create-subscriber-use-case";
import { PrismaClientRepository } from "@infra/database/prisma/repositories/prisma-client-repository";
import { PrismaSubscriberRepository } from "@infra/database/prisma/repositories/prisma-subscriber-repository";
import { CreateSubscriberController } from "../controllers/create-subscriber-controller";

const prismaClientRepository = new PrismaClientRepository();
const prismaSubscriberRepository = new PrismaSubscriberRepository();
const createSubscriberUseCase = new CreateSubscriberUseCase(
  prismaSubscriberRepository,
  prismaClientRepository
);
const createSubscriberController = new CreateSubscriberController(
  createSubscriberUseCase
);

export { createSubscriberUseCase, createSubscriberController };
