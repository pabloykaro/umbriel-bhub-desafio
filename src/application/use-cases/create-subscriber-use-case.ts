import { Subscriber } from "@application/entities/subscriber";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { ThemeContent } from "@application/entities/value-objects/theme-content";
import { ClientRepository } from "@application/repositories/client-repository";
import { SubscriberRepository } from "@application/repositories/subscriber-repository";
import { AlreadyExist } from "./errors/already-exist";
import { NotFound } from "./errors/not-found";

interface CreateSubscriberRequest {
  email: string;
  fullName: string;
  themeContent: string;
}

export class CreateSubscriberUseCase {
  constructor(
    private subscriberRepository: SubscriberRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute(data: CreateSubscriberRequest) {
    const { email, fullName, themeContent } = data;
    const client = await this.clientRepository.findByEmail(email);
    const subscriber =
      await this.subscriberRepository.findByEmailAndThemeContent(
        email,
        themeContent
      );

    if (!client) throw new NotFound("client");
    if (subscriber)
      throw new AlreadyExist("Subscriber already exists with theme content.");

    const subscriberEntity = new Subscriber({
      email: new Email(email),
      fullName: new FullName(fullName),
      themeContent: new ThemeContent(themeContent),
    });
    await this.subscriberRepository.create(subscriberEntity);
    return {
      subscriberEntity,
    };
  }
}
