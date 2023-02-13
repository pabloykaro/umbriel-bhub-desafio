import { Client } from "@application/entities/Client";
import { ClientRepository } from "@application/repositories/client-repository";
import { PrismaClientMapper } from "../mappers/prisma-client-mapper";
import { prisma } from "../prisma.connect";

export class PrismaClientRepository implements ClientRepository {
  async findById(idClient: string): Promise<Client | null> {
    const response = await prisma.client.findUnique({
      where: {
        id: idClient,
      },
    });
    if (!response) return null;
    return PrismaClientMapper.toDomain(response);
  }
  async findByEmail(emailClient: string): Promise<Client | null> {
    const response = await prisma.client.findUnique({
      where: {
        email: emailClient,
      },
    });
    if (!response) return null;
    return PrismaClientMapper.toDomain(response);
  }
  async findManyClient(): Promise<Client[] | null> {
    const response = await prisma.client.findMany();
    if (!response) return null;
    return response.map(PrismaClientMapper.toDomain);
  }

  async create(client: Client): Promise<void> {
    const response = PrismaClientMapper.toPrisma(client);
    await prisma.client.create({
      data: response,
    });
  }
  async save(client: Client): Promise<void> {
    const response = PrismaClientMapper.toPrisma(client);
    await prisma.client.update({
      data: response,
      where: {
        id: client.id,
      },
    });
  }
  async delete(idClient: string): Promise<void> {
    await prisma.client.delete({
      where: {
        id: idClient,
      },
    });
  }
}
