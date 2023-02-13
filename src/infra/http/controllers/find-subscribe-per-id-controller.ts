import { NotFound } from "@application/use-cases/errors/not-found";
import { FindSubscriberPerIdUseCase } from "@application/use-cases/find-subscriber-per-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdSubscribeRequestDTO } from "../dtos/id-subscribe-request-dto";
import { SubscriberViewModel } from "../view-models/subscriber-view-model";

export class FindSubscribePerIdController {
  constructor(private findSubscriberPerIdUseCase: FindSubscriberPerIdUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdSubscribeRequestDTO;
      const { responseDataAboutSubscribe } =
        await this.findSubscriberPerIdUseCase.execute(id);

      return reply
        .status(200)
        .send(
          SubscriberViewModel.returnSubscriberToHTTP(responseDataAboutSubscribe)
        );
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(SubscriberViewModel.notFoundToHTTP("Subscribe not found."));
    }
  }
}
