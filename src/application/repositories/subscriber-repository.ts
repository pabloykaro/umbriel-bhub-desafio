import { Subscriber } from "@application/entities/subscriber";

export abstract class SubscriberRepository {
  abstract findById(idSubscriber: string): Promise<Subscriber | null>;
  abstract findByEmailAndThemeContent(
    email: string,
    themeContent: string
  ): Promise<Subscriber | null>;
  abstract findByEmail(email: string): Promise<Subscriber[] | null>;
  abstract findManySubscriber(): Promise<Subscriber[] | null>;
  abstract create(subscriber: Subscriber): Promise<void>;
  abstract save(subscriber: Subscriber): Promise<void>;
  abstract delete(email: string, themeContent: string): Promise<void>;
}
