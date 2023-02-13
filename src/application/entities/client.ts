import { Replace } from "@application/helpers/Replace";
import { v4 as uuid } from "uuid";
import { Email } from "./value-objects/email";
import { FullName } from "./value-objects/full-name";
import { NameAddress } from "./value-objects/name-address";
import { NumberPhone } from "./value-objects/number-phone";

export interface ClientProps {
  idClient: string;
  email: Email;
  fullName: FullName;
  personalPhone: NumberPhone;
  personalAddress: NameAddress;
  statusAccount: string;
  createAt: Date;
  updateAt?: Date | null;
}

export class Client {
  private props: ClientProps;
  constructor(
    props: Replace<
      ClientProps,
      {
        idClient?: string;
        statusAccount?: string;
        createAt?: Date;
        updateAt?: Date | null;
      }
    >
  ) {
    this.props = {
      ...props,
      idClient: props.idClient ?? uuid(),
      statusAccount: props.statusAccount ?? "activated",
      createAt: props.createAt ?? new Date(),
      updateAt: props.updateAt ?? null,
    };
  }

  public get id() {
    return this.props.idClient;
  }

  public get email() {
    return this.props.email;
  }
  public set email(email: Email) {
    this.props.email = email;
  }

  public get fullName() {
    return this.props.fullName;
  }
  public set fullName(fullName: FullName) {
    this.props.fullName = fullName;
  }

  public get personalPhone() {
    return this.props.personalPhone;
  }
  public set personalPhone(personalPhone: NumberPhone) {
    this.props.personalPhone = personalPhone;
  }

  public get personalAddress() {
    return this.props.personalAddress;
  }
  public set personalAddress(personalAddress: NameAddress) {
    this.props.personalAddress = personalAddress;
  }

  public get createAt() {
    return this.props.createAt;
  }
  public get updateAt() {
    return this.props.updateAt;
  }

  public get statusAccount() {
    return this.props.statusAccount;
  }
  public activeAccount() {
    this.props.statusAccount = "activated";
  }
  public disableAccount() {
    this.props.statusAccount = "disabled";
  }
  public update() {
    this.props.updateAt = new Date();
  }
}
