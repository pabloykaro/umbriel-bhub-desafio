import { Company } from "@application/entities/company";
import { CnpjNumber } from "@application/entities/value-objects/cnpj-number";
import { DeclaredBilling } from "@application/entities/value-objects/declared-billing";
import { IdClient } from "@application/entities/value-objects/id-client";
import { NameAddress } from "@application/entities/value-objects/name-address";
import { NumberPhone } from "@application/entities/value-objects/number-phone";
import { Company as RawCompany } from "@prisma/client";

export class PrismaCompanyMapper {
  static toPrisma(company: Company) {
    return {
      id: company.idCompany,
      id_client: company.idClient.value,
      cnpj_number: company.cnpjNumber.value,
      cnpj_address: company.cnpjAddress.value,
      cnpj_phone: company.cnpjPhone.value,
      status_company: company.statusCompany,
      declared_billing: company.declaredBilling.value,
      create_at: company.createAt,
      update_at: company.updateAt,
    };
  }

  static toDomain(raw: RawCompany): Company {
    return new Company({
      idCompany: raw.id,
      idClient: new IdClient(raw.id_client),
      cnpjNumber: new CnpjNumber(raw.cnpj_number),
      cnpjAddress: new NameAddress(raw.cnpj_address),
      cnpjPhone: new NumberPhone(raw.cnpj_phone),
      statusCompany: raw.status_company,
      declaredBilling: new DeclaredBilling(
        parseFloat(raw.declared_billing.toFixed(2))
      ),
      createAt: raw.create_at,
      updateAt: raw.update_at,
    });
  }
}
