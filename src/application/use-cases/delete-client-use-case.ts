import { ClientRepository } from "@application/repositories/client-repository";
import { NotFound } from "./errors/not-found";

export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute(idClient: string) {
    const client = await this.clientRepository.findById(idClient);

    if (!client) throw new NotFound("client");
    await this.clientRepository.delete(idClient);
  }
}
