import { NotFound } from "@application/use-cases/errors/not-found";
import { FindClientPerIdUseCase } from "@application/use-cases/find-client-per-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdClientRequestDTO } from "../dtos/id-client-request-dto";
import { ClientViewModel } from "../view-models/client-view-model";

export class FindClientPerIdController {
  constructor(private findClientPerIdUseCase: FindClientPerIdUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdClientRequestDTO;
      const { responseDataAboutClient } =
        await this.findClientPerIdUseCase.execute(id);

      return reply
        .status(200)
        .send(ClientViewModel.returnClientToHTTP(responseDataAboutClient));
    } catch (err) {
      if (err instanceof NotFound)
        return reply.status(404).send(ClientViewModel.notFoundToHTTP());
    }
  }
}
