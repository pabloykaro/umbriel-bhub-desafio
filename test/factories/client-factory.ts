import { Client, ClientProps } from "@application/entities/client";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";

type Override = Partial<ClientProps>;

export function makeCreateClient(override: Override = {}) {
  return new Client({
    email: new Email("pabloykaro9@gmail.com"),
    fullName: new FullName("Pablo Ykaro Barbosa Martins"),
    personalAddress: new NameAddress("Rua Coronel Cícero Nogueira 399"),
    personalPhone: new NumberPhone("85994192707"),
    ...override,
  });
}
