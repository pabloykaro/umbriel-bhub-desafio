import { ActiveClientUseCase } from "@application/use-cases/active-client-use-case";
import { AlreadyActivated } from "@application/use-cases/errors/already-activated";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdClientRequestDTO } from "../dtos/id-client-request-dto";
import { ClientViewModel } from "../view-models/client-view-model";

export class ActiveClientController {
  constructor(private activeClientUseCase: ActiveClientUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdClientRequestDTO;
      await this.activeClientUseCase.execute(id);
      return reply.status(200).send(
        ClientViewModel.successClientToHTTP({
          type_action: "activated",
          status: "Client activated with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply.status(404).send(ClientViewModel.notFoundToHTTP());

      if (err instanceof AlreadyActivated)
        return reply.status(409).send(
          ClientViewModel.conflictClientToHTTP({
            type_conflict: "Client is already activated.",
          })
        );
    }
  }
}
