import { ClientRepository } from "@application/repositories/client-repository";
import { AlreadyActivated } from "./errors/already-activated";
import { NotFound } from "./errors/not-found";

export class ActiveClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute(idClient: string) {
    const client = await this.clientRepository.findById(idClient);
    if (!client) throw new NotFound("client");
    if (client.statusAccount === "activated")
      throw new AlreadyActivated("Client already activated");
    client.activeAccount();
    client.update();
    await this.clientRepository.save(client);
  }
}
