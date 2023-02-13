import { Company, CompanyProps } from "@application/entities/company";
import { CnpjNumber } from "@application/entities/value-objects/cnpj-number";
import { DeclaredBilling } from "@application/entities/value-objects/declared-billing";
import { IdClient } from "@application/entities/value-objects/id-client";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";

type Override = Partial<CompanyProps>;

export function makeCreateCompany(override: Override = {}) {
  return new Company({
    idClient: new IdClient("f85b4ec2-04e9-4792-909f-15f83576ecb1"),
    declaredBilling: new DeclaredBilling(1550),
    cnpjNumber: new CnpjNumber("75254402000111"),
    cnpjAddress: new NameAddress("Rua Coronel Cícero Nogueira 399"),
    cnpjPhone: new NumberPhone("85994192707"),
    ...override,
  });
}
