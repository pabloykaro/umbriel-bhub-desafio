import { Client } from "@application/entities/client";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";
import { ClientRepository } from "@application/repositories/client-repository";
import { AlreadyExist } from "./errors/already-exist";

interface CreateClientRequest {
  email: string;
  fullName: string;
  personalPhone: string;
  personalAddress: string;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(data: CreateClientRequest) {
    const { email, fullName, personalAddress, personalPhone } = data;
    const client = await this.clientRepository.findByEmail(email);

    if (client) throw new AlreadyExist("Client already exists.");

    const clientEntity = new Client({
      email: new Email(email),
      fullName: new FullName(fullName),
      personalAddress: new NameAddress(personalAddress),
      personalPhone: new NumberPhone(personalPhone),
    });
    await this.clientRepository.create(clientEntity);
    return {
      clientEntity,
    };
  }
}
