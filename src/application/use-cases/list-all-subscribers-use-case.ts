import { SubscriberRepository } from "@application/repositories/subscriber-repository";
import { NotFound } from "./errors/not-found";

export class ListAllSubscribersUseCase {
  constructor(private subscriberRepository: SubscriberRepository) {}
  async execute() {
    const listOfSubscribers =
      await this.subscriberRepository.findManySubscriber();
    if (!listOfSubscribers) throw new NotFound("subscribers");

    return {
      listOfSubscribers,
    };
  }
}
