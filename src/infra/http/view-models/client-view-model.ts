import { Client } from "@application/entities/client";

interface SuccessClientToHTTPProps {
  type_action: "created" | "activated" | "disabled" | "deleted" | "updated";
  status:
    | "Client create with success."
    | "Client activated with success."
    | "Client disabled with success."
    | "Client deleted with success."
    | "Client updated with success.";
}

interface ConflictClientToHTTPProps {
  type_conflict:
    | "Client already exists."
    | "Client is already activated."
    | "Client is already disabled.";
}

export class ClientViewModel {
  static successClientToHTTP(response: SuccessClientToHTTPProps) {
    return {
      data: {
        ...response,
      },
    };
  }

  static returnClientToHTTP(client: Client) {
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

  static fieldInvalidToHTTP() {
    return {
      data: {
        create: false,
        status: "Unable to create a client, fields invalid.",
      },
    };
  }

  static notFoundToHTTP() {
    return {
      data: {
        status: "Client not found.",
      },
    };
  }

  static conflictClientToHTTP(response: ConflictClientToHTTPProps) {
    return {
      data: {
        ...response,
        requisition_status: "Request was not accepted.",
      },
    };
  }
}
