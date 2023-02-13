import { Subscriber } from "@application/entities/subscriber";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { ThemeContent } from "@application/entities/value-objects/theme-content";
import { SubscriberRepository } from "@application/repositories/subscriber-repository";

export class InMemorySubscriberRepository implements SubscriberRepository {
  public subscriber: Subscriber[] = [];

  async findById(idSubscriber: string): Promise<Subscriber | null> {
    const subscriber = this.subscriber.find((item) => item.id === idSubscriber);

    if (!subscriber) {
      return null;
    }

    return subscriber;
  }

  async findByEmailAndThemeContent(
    email: string,
    themeContent: string
  ): Promise<Subscriber | null> {
    const subscriber = this.subscriber.find(
      (item) =>
        item.email.value === email && item.themeContent.value === themeContent
    );
    if (!subscriber) return null;
    return subscriber;
  }

  async findByEmail(email: string): Promise<Subscriber[] | null> {
    const subscriber = this.subscriber.filter(
      (item) => item.email.value === email
    );
    if (!subscriber) return null;

    const listSubscribers = subscriber.map(
      (item) =>
        new Subscriber({
          idSubscriber: item.id,
          email: new Email(item.email.value),
          fullName: new FullName(item.fullName.value),
          themeContent: new ThemeContent(item.themeContent.value),
          statusSubscriber: item.statusSubscriber,
          createAt: item.createAt,
          updateAt: item.updateAt,
        })
    );
    return listSubscribers;
  }

  async findManySubscriber(): Promise<Subscriber[] | null> {
    const listManySubscribers = this.subscriber.filter((item) => item);
    if (!listManySubscribers) return null;
    return listManySubscribers;
  }

  async create(subscriber: Subscriber) {
    this.subscriber.push(subscriber);
  }

  async save(subscriber: Subscriber): Promise<void> {
    const subscriberIndex = this.subscriber.findIndex(
      (item) => item.id === subscriber.id
    );

    if (subscriberIndex >= 0) {
      this.subscriber[subscriberIndex] = subscriber;
    }
  }

  async delete(email: string, themeContent: string): Promise<void> {
    const subscriber = this.subscriber.findIndex(
      (item) =>
        item.email.value === email && item.themeContent.value === themeContent
    );

    if (subscriber >= 0) {
      this.subscriber.splice(subscriber, 1);
    }
  }
}
