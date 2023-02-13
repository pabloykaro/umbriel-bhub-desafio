import { ChangeClientUseCase } from "@application/use-cases/change-client-use-case";
import { IdClientRequestDTO } from "../dtos/id-client-request-dto";
import { CreateClientRequestDTO } from "../dtos/create-client-request-dto";
import { FastifyReply, FastifyRequest } from "fastify";
import { ClientViewModel } from "../view-models/client-view-model";
import { NotFound } from "@application/use-cases/errors/not-found";

export class ChangeClientController {
  constructor(private changeClientUseCase: ChangeClientUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdClientRequestDTO;
      const { email, full_name, personal_address, personal_phone } =
        request.body as CreateClientRequestDTO;
      await this.changeClientUseCase.execute({
        id,
        email,
        fullName: full_name,
        personalAddress: personal_address,
        personalPhone: personal_phone,
      });
      return reply.status(200).send(
        ClientViewModel.successClientToHTTP({
          type_action: "updated",
          status: "Client updated with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply.status(404).send(ClientViewModel.notFoundToHTTP());

      return reply.status(400).send(ClientViewModel.fieldInvalidToHTTP());
    }
  }
}
