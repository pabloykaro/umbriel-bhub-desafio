import { NotFound } from "@application/use-cases/errors/not-found";
import { FindSubscriberPerEmailUseCase } from "@application/use-cases/find-subscribers-per-email-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { SubscriberRequestDTO } from "../dtos/subscriber-request-dto";
import { SubscriberViewModel } from "../view-models/subscriber-view-model";

export class FindSubscribePerEmailController {
  constructor(
    private findSubscriberPerEmailUseCase: FindSubscriberPerEmailUseCase
  ) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = request.params as Pick<SubscriberRequestDTO, "email">;
      const { responseDataAboutSubscribe } =
        await this.findSubscriberPerEmailUseCase.execute(email);

      return reply
        .status(200)
        .send(
          responseDataAboutSubscribe.map(
            SubscriberViewModel.returnSubscriberToHTTP
          )
        );
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(SubscriberViewModel.notFoundToHTTP("Subscribe not found."));
    }
  }
}
