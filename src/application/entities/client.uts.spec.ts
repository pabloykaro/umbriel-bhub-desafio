import { Client } from "./client";
import { Email } from "./value-objects/email";
import { FullName } from "./value-objects/full-name";
import { NameAddress } from "./value-objects/name-address";
import { NumberPhone } from "./value-objects/number-phone";

describe("Case test entity client", () => {
  it("should be able to create client", () => {
    const client = new Client({
      email: new Email("pabloykaro9@gmail.com"),
      fullName: new FullName("Pablo Ykaro Barbosa Martins"),
      personalAddress: new NameAddress("Rua Coronel Cícero Nogueira 399"),
      personalPhone: new NumberPhone("85994192707"),
    });
    expect(client).toBeTruthy();
  });
});
