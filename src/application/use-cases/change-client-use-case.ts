import { Client } from "@application/entities/client";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";
import { ClientRepository } from "@application/repositories/client-repository";
import { NotFound } from "./errors/not-found";

interface ChangeClientRequest {
  id: string;
  email: string;
  fullName: string;
  personalPhone: string;
  personalAddress: string;
}

export class ChangeClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute(data: ChangeClientRequest) {
    const client = await this.clientRepository.findById(data.id);
    if (!client) throw new NotFound("client");

    const entityClient = new Client({
      idClient: client.id,
      email: new Email(data.email),
      fullName: new FullName(data.fullName),
      personalAddress: new NameAddress(data.personalAddress),
      personalPhone: new NumberPhone(data.personalPhone),
      statusAccount: client.statusAccount,
      createAt: client.createAt,
    });
    entityClient.update();
    await this.clientRepository.save(entityClient);
  }
}
