import { v4 as uuid } from "uuid";
import { Company } from "./company";
import { CnpjNumber } from "./value-objects/cnpj-number";
import { DeclaredBilling } from "./value-objects/declared-billing";
import { IdClient } from "./value-objects/id-client";
import { NameAddress } from "./value-objects/name-address";
import { NumberPhone } from "./value-objects/number-phone";

describe("Case test entity company", () => {
  it("should be able to create company", () => {
    const company = new Company({
      idClient: new IdClient(uuid()),
      cnpjNumber: new CnpjNumber("12859051000152"),
      cnpjAddress: new NameAddress("Rua Coronel Cícero Nogueira 399"),
      cnpjPhone: new NumberPhone("85994192707"),
      declaredBilling: new DeclaredBilling(1500.0),
    });
    expect(company).toBeTruthy();
  });
});
