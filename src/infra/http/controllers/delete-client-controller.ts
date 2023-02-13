import { DeleteClientUseCase } from "@application/use-cases/delete-client-use-case";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdClientRequestDTO } from "../dtos/id-client-request-dto";
import { ClientViewModel } from "../view-models/client-view-model";

export class DeleteClientController {
  constructor(private deleteClientUseCase: DeleteClientUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdClientRequestDTO;
      await this.deleteClientUseCase.execute(id);
      return reply.status(200).send(
        ClientViewModel.successClientToHTTP({
          type_action: "deleted",
          status: "Client deleted with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply.status(404).send(ClientViewModel.notFoundToHTTP());
    }
  }
}
