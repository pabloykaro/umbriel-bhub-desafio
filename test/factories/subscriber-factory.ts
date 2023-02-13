import { Subscriber, SubscriberProps } from "@application/entities/subscriber";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { ThemeContent } from "@application/entities/value-objects/theme-content";

type Override = Partial<SubscriberProps>;

export function makeCreateSubscriber(override: Override = {}) {
  return new Subscriber({
    email: new Email("pabloykaro9@gmail.com"),
    fullName: new FullName("Pablo Ykaro Barbosa Martins"),
    themeContent: new ThemeContent("finances"),
    ...override,
  });
}
