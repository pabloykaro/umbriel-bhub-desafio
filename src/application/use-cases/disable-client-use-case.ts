import { ClientRepository } from "@application/repositories/client-repository";
import { AlreadyDisabled } from "./errors/already-disabled";
import { NotFound } from "./errors/not-found";

export class DisableClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute(idClient: string) {
    const client = await this.clientRepository.findById(idClient);
    if (!client) throw new NotFound("client");
    if (client.statusAccount === "disabled")
      throw new AlreadyDisabled("Client already disabled");
    client.disableAccount();
    client.update();
    await this.clientRepository.save(client);
  }
}
