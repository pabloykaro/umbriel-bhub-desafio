import { DeleteSubscriberUseCase } from "@application/use-cases/delete-subscriber-use-case";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { SubscriberRequestDTO } from "../dtos/subscriber-request-dto";
import { SubscriberViewModel } from "../view-models/subscriber-view-model";

export class DeleteSubscriberController {
  constructor(private deleteSubscriberUseCase: DeleteSubscriberUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, theme_content } = request.body as Pick<
        SubscriberRequestDTO,
        "email" | "theme_content"
      >;
      await this.deleteSubscriberUseCase.execute(email, theme_content);
      return reply.status(200).send(
        SubscriberViewModel.successSubscriberToHTTP({
          type_action: "deleted",
          status: "Subscriber deleted with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(
            SubscriberViewModel.notFoundToHTTP(
              "Subscriber not delete, client not found."
            )
          );
    }
  }
}
