import { Company } from "@application/entities/company";

interface SuccessCompanyToHTTPProps {
  type_action: "created" | "activated" | "disabled" | "deleted" | "updated";
  status:
    | "Company create with success."
    | "Company activated with success."
    | "Company disabled with success."
    | "Company deleted with success."
    | "Company updated with success.";
}

interface ConflictCompanyToHTTPProps {
  type_conflict:
    | "Company already exists."
    | "Company is already activated."
    | "Company is already disabled.";
}

export class CompanyViewModel {
  static successCompanyToHTTP(response: SuccessCompanyToHTTPProps) {
    return {
      data: {
        ...response,
      },
    };
  }

  static returnCompanyToHTTP(company: Company) {
    return {
      id: company.idCompany,
      id_client: company.idClient.value,
      cnpj_number: company.cnpjNumber.value,
      cnpj_address: company.cnpjAddress.value,
      cnpj_phone: company.cnpjPhone.value,
      declared_billing: company.declaredBilling.value,
      status_company: company.statusCompany,
      create_at: company.createAt,
      update_at: company.updateAt,
    };
  }

  static fieldInvalidToHTTP() {
    return {
      data: {
        create: false,
        status: "Unable to create a company, fields invalid.",
      },
    };
  }

  static notFoundToHTTP(message: string) {
    return {
      data: {
        status: message,
      },
    };
  }

  static conflictCompanyToHTTP(response: ConflictCompanyToHTTPProps) {
    return {
      data: {
        ...response,
        requisition_status: "Request was not accepted.",
      },
    };
  }
}
