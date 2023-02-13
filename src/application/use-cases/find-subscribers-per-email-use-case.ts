import { SubscriberRepository } from "@application/repositories/subscriber-repository";
import { NotFound } from "./errors/not-found";

export class FindSubscriberPerEmailUseCase {
  constructor(private subscriberRepository: SubscriberRepository) {}
  async execute(email: string) {
    const responseDataAboutSubscribe =
      await this.subscriberRepository.findByEmail(email);
    if (!responseDataAboutSubscribe) throw new NotFound("subscribe");

    return {
      responseDataAboutSubscribe,
    };
  }
}
