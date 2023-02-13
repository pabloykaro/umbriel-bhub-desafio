import { ClientRepository } from "@application/repositories/client-repository";
import { NotFound } from "./errors/not-found";

export class FindClientPerIdUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute(idClient: string) {
    const responseDataAboutClient = await this.clientRepository.findById(
      idClient
    );
    if (!responseDataAboutClient) throw new NotFound("client");

    return {
      responseDataAboutClient,
    };
  }
}
