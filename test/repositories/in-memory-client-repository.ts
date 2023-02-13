import { Client } from "@application/entities/client";
import { ClientRepository } from "@application/repositories/client-repository";

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];

  async findById(idClient: string): Promise<Client | null> {
    const client = this.clients.find((item) => item.id === idClient);

    if (!client) {
      return null;
    }

    return client;
  }
  async findByEmail(email: string): Promise<Client | null> {
    const client = this.clients.find((item) => item.email.value === email);

    if (!client) {
      return null;
    }

    return client;
  }
  async findManyClient(): Promise<Client[] | null> {
    const clients = this.clients.map((item) => item);

    if (!clients) {
      return null;
    }

    return clients;
  }

  async create(client: Client) {
    this.clients.push(client);
  }

  async save(client: Client): Promise<void> {
    const clientIndex = this.clients.findIndex((item) => item.id === client.id);

    if (clientIndex >= 0) {
      this.clients[clientIndex] = client;
    }
  }
  async delete(idClient: string): Promise<void> {
    const client = this.clients.findIndex((item) => item.id === idClient);
    if (client >= 0) {
      this.clients.splice(client, 1);
    }
  }
}
