import { DisableClientUseCase } from "@application/use-cases/disable-client-use-case";
import { AlreadyDisabled } from "@application/use-cases/errors/already-disabled";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdClientRequestDTO } from "../dtos/id-client-request-dto";
import { ClientViewModel } from "../view-models/client-view-model";

export class DisableClientController {
  constructor(private disableClientUseCase: DisableClientUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdClientRequestDTO;
      await this.disableClientUseCase.execute(id);
      return reply.status(200).send(
        ClientViewModel.successClientToHTTP({
          type_action: "disabled",
          status: "Client disabled with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply.status(404).send(ClientViewModel.notFoundToHTTP());

      if (err instanceof AlreadyDisabled)
        return reply.status(409).send(
          ClientViewModel.conflictClientToHTTP({
            type_conflict: "Client is already disabled.",
          })
        );
    }
  }
}
