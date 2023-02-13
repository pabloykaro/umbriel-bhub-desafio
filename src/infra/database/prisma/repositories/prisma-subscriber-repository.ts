import { Subscriber } from "@application/entities/subscriber";
import { SubscriberRepository } from "@application/repositories/subscriber-repository";
import { PrismaSubscriberMapper } from "../mappers/prisma-subscriber-mapper";
import { prisma } from "../prisma.connect";

export class PrismaSubscriberRepository implements SubscriberRepository {
  async findById(idSubscriber: string): Promise<Subscriber | null> {
    const response = await prisma.clubSubscriber.findUnique({
      where: {
        id: idSubscriber,
      },
    });
    if (!response) return null;
    return PrismaSubscriberMapper.toDomain(response);
  }
  async findByEmailAndThemeContent(
    emailClient: string,
    themeContent: string
  ): Promise<Subscriber | null> {
    const response = await prisma.clubSubscriber.findUnique({
      where: {
        email_theme_content: {
          email: emailClient,
          theme_content: themeContent,
        },
      },
    });
    if (!response) return null;
    return PrismaSubscriberMapper.toDomain(response);
  }
  async findByEmail(emailClient: string): Promise<Subscriber[] | null> {
    const response = await prisma.clubSubscriber.findMany({
      where: {
        email: emailClient,
      },
    });
    if (!response) return null;
    return response.map(PrismaSubscriberMapper.toDomain);
  }
  async findManySubscriber(): Promise<Subscriber[] | null> {
    const response = await prisma.clubSubscriber.findMany();
    if (!response) return null;
    return response.map(PrismaSubscriberMapper.toDomain);
  }

  async create(subscriber: Subscriber): Promise<void> {
    const response = PrismaSubscriberMapper.toPrisma(subscriber);
    await prisma.clubSubscriber.create({
      data: response,
    });
  }
  async save(subscriber: Subscriber): Promise<void> {
    const response = PrismaSubscriberMapper.toPrisma(subscriber);
    await prisma.clubSubscriber.update({
      data: response,
      where: {
        id: subscriber.id,
      },
    });
  }
  async delete(email: string, themeContent: string): Promise<void> {
    await prisma.clubSubscriber.delete({
      where: {
        email_theme_content: {
          email,
          theme_content: themeContent,
        },
      },
    });
  }
}
