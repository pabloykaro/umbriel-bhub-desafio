import { Client } from "@application/entities/Client";

export abstract class ClientRepository {
  abstract findById(idClient: string): Promise<Client | null>;
  abstract findByEmail(emailClient: string): Promise<Client | null>;
  abstract findManyClient(): Promise<Client[] | null>;
  abstract create(client: Client): Promise<void>;
  abstract save(client: Client): Promise<void>;
  abstract delete(idClient: string): Promise<void>;
}
