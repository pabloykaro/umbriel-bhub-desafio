import { CreateSubscriberUseCase } from "@application/use-cases/create-subscriber-use-case";
import { AlreadyExist } from "@application/use-cases/errors/already-exist";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { SubscriberRequestDTO } from "../dtos/subscriber-request-dto";
import { SubscriberViewModel } from "../view-models/subscriber-view-model";
export class CreateSubscriberController {
  constructor(private createSubscriberUseCase: CreateSubscriberUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, full_name, theme_content } =
        request.body as SubscriberRequestDTO;
      const { subscriberEntity } = await this.createSubscriberUseCase.execute({
        email,
        fullName: full_name,
        themeContent: theme_content,
      });
      return reply
        .status(201)
        .send(SubscriberViewModel.returnSubscriberToHTTP(subscriberEntity));
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(
            SubscriberViewModel.notFoundToHTTP(
              "Subscriber not create, client not found."
            )
          );
      if (err instanceof AlreadyExist)
        return reply.status(409).send(
          SubscriberViewModel.conflictSubscriberToHTTP({
            type_conflict: "Subscriber already exists.",
          })
        );

      return reply.status(400).send(SubscriberViewModel.fieldInvalidToHTTP());
    }
  }
}
