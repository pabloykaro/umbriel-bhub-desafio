import { Client } from "@application/entities/client";
import { Email } from "@application/entities/value-objects/email";
import { FullName } from "@application/entities/value-objects/full-name";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";
import { Client as RawClient } from "@prisma/client";

export class PrismaClientMapper {
  static toPrisma(client: Client) {
    return {
      id: client.id,
      email: client.email.value,
      full_name: client.fullName.value,
      personal_address: client.personalAddress.value,
      personal_phone: client.personalPhone.value,
      status_account: client.statusAccount,
      create_at: client.createAt,
      update_at: client.updateAt,
    };
  }

  static toDomain(raw: RawClient): Client {
    return new Client({
      idClient: raw.id,
      email: new Email(raw.email),
      fullName: new FullName(raw.full_name),
      personalAddress: new NameAddress(raw.personal_address),
      personalPhone: new NumberPhone(raw.personal_phone),
      createAt: raw.create_at,
      statusAccount: raw.status_account,
      updateAt: raw.update_at,
    });
  }
}
