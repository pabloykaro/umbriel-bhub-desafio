import { NotFound } from "@application/use-cases/errors/not-found";
import { ListAllClientsUseCase } from "@application/use-cases/list-all-clients-use-case";
import { FastifyReply } from "fastify";
import { ClientViewModel } from "../view-models/client-view-model";

export class ListAllClientsController {
  constructor(private listAllClientsUseCase: ListAllClientsUseCase) {}
  async handle(reply: FastifyReply) {
    try {
      const { listOfClients } = await this.listAllClientsUseCase.execute();

      return reply
        .status(200)
        .send(listOfClients.map(ClientViewModel.returnClientToHTTP));
    } catch (err) {
      if (err instanceof NotFound)
        return reply.status(404).send(ClientViewModel.notFoundToHTTP());
    }
  }
}
