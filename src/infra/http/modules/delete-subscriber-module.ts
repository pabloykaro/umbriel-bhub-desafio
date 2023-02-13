import { DeleteSubscriberUseCase } from "@application/use-cases/delete-subscriber-use-case";
import { PrismaSubscriberRepository } from "@infra/database/prisma/repositories/prisma-subscriber-repository";
import { DeleteSubscriberController } from "../controllers/delete-subscriber-controller";

const prismaSubscriberRepository = new PrismaSubscriberRepository();
const deleteSubscriberUseCase = new DeleteSubscriberUseCase(
  prismaSubscriberRepository
);
const deleteSubscriberController = new DeleteSubscriberController(
  deleteSubscriberUseCase
);

export { deleteSubscriberUseCase, deleteSubscriberController };
