import { Subscriber } from "@application/entities/subscriber";

interface SuccessSubscriberToHTTPProps {
  type_action: "created" | "activated" | "disabled" | "deleted" | "updated";
  status:
    | "Subscriber create with success."
    | "Subscriber activated with success."
    | "Subscriber disabled with success."
    | "Subscriber deleted with success."
    | "Subscriber updated with success.";
}

interface ConflictSubscriberToHTTPProps {
  type_conflict:
    | "Subscriber already exists."
    | "Subscriber is already activated."
    | "Subscriber is already disabled.";
}

export class SubscriberViewModel {
  static successSubscriberToHTTP(response: SuccessSubscriberToHTTPProps) {
    return {
      data: {
        ...response,
      },
    };
  }

  static returnSubscriberToHTTP(subscriber: Subscriber) {
    return {
      id: subscriber.id,
      email: subscriber.email.value,
      theme_content: subscriber.themeContent.value,
      full_name: subscriber.fullName.value,
      create_at: subscriber.createAt,
      update_at: subscriber.updateAt,
    };
  }

  static fieldInvalidToHTTP() {
    return {
      data: {
        create: false,
        status: "Unable to create a subscriber, fields invalid.",
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

  static conflictSubscriberToHTTP(response: ConflictSubscriberToHTTPProps) {
    return {
      data: {
        ...response,
        requisition_status: "Request was not accepted.",
      },
    };
  }
}
