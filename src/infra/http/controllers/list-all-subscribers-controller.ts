import { NotFound } from "@application/use-cases/errors/not-found";
import { ListAllSubscribersUseCase } from "@application/use-cases/list-all-subscribers-use-case";
import { FastifyReply } from "fastify";
import { SubscriberViewModel } from "../view-models/subscriber-view-model";

export class ListAllSubscribersController {
  constructor(private listAllSubscribersUseCase: ListAllSubscribersUseCase) {}
  async handle(reply: FastifyReply) {
    try {
      const { listOfSubscribers } =
        await this.listAllSubscribersUseCase.execute();

      return reply
        .status(200)
        .send(
          listOfSubscribers.map(SubscriberViewModel.returnSubscriberToHTTP)
        );
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(SubscriberViewModel.notFoundToHTTP("subscribers"));
    }
  }
}
