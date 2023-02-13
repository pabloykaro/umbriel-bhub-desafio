import { CreateClientUseCase } from "@application/use-cases/create-client-use-case";
import { AlreadyExist } from "@application/use-cases/errors/already-exist";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateClientRequestDTO } from "../dtos/create-client-request-dto";
import { ClientViewModel } from "../view-models/client-view-model";
export class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, full_name, personal_address, personal_phone } =
        request.body as CreateClientRequestDTO;
      const { clientEntity } = await this.createClientUseCase.execute({
        email,
        fullName: full_name,
        personalAddress: personal_address,
        personalPhone: personal_phone,
      });

      return reply
        .status(201)
        .send(ClientViewModel.returnClientToHTTP(clientEntity));
    } catch (err) {
      if (err instanceof AlreadyExist)
        return reply.status(409).send(
          ClientViewModel.conflictClientToHTTP({
            type_conflict: "Client already exists.",
          })
        );

      return reply.status(400).send(ClientViewModel.fieldInvalidToHTTP());
    }
  }
}
