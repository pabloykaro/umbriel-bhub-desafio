import { Subscriber } from "@application/entities/subscriber";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { ThemeContent } from "@application/entities/value-objects/theme-content";
import { ClubSubscriber as RawSubscriber } from "@prisma/client";

export class PrismaSubscriberMapper {
  static toPrisma(subscriber: Subscriber) {
    return {
      id: subscriber.id,
      email: subscriber.email.value,
      full_name: subscriber.fullName.value,
      theme_content: subscriber.themeContent.value,
      status_subscriber: subscriber.statusSubscriber,
      create_at: subscriber.createAt,
      update_at: subscriber.updateAt,
    };
  }

  static toDomain(raw: RawSubscriber): Subscriber {
    return new Subscriber({
      idSubscriber: raw.id,
      email: new Email(raw.email),
      fullName: new FullName(raw.full_name),
      themeContent: new ThemeContent(raw.theme_content),
      statusSubscriber: raw.status_subscriber,
      createAt: raw.create_at,
      updateAt: raw.update_at,
    });
  }
}
