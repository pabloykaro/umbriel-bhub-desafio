import { SubscriberRepository } from "@application/repositories/subscriber-repository";
import { NotFound } from "./errors/not-found";

export class FindSubscriberPerIdUseCase {
  constructor(private subscriberRepository: SubscriberRepository) {}
  async execute(idSubscribe: string) {
    const responseDataAboutSubscribe = await this.subscriberRepository.findById(
      idSubscribe
    );
    if (!responseDataAboutSubscribe) throw new NotFound("subscribe");

    return {
      responseDataAboutSubscribe,
    };
  }
}
