import { ClientRepository } from "@application/repositories/client-repository";
import { NotFound } from "./errors/not-found";

export class ListAllClientsUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute() {
    const listOfClients = await this.clientRepository.findManyClient();
    if (!listOfClients) throw new NotFound("clients");

    return {
      listOfClients,
    };
  }
}
