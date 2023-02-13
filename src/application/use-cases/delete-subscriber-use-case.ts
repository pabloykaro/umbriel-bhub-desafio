import { SubscriberRepository } from "@application/repositories/subscriber-repository";
import { NotFound } from "./errors/not-found";

export class DeleteSubscriberUseCase {
  constructor(private subscriberRepository: SubscriberRepository) {}
  async execute(email: string, themeContent: string) {
    const subscriber =
      await this.subscriberRepository.findByEmailAndThemeContent(
        email,
        themeContent
      );

    if (!subscriber) throw new NotFound("subscribe");
    await this.subscriberRepository.delete(email, themeContent);
  }
}
