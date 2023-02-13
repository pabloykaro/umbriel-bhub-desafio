import { Replace } from "@application/helpers/Replace";
import { v4 as uuid } from "uuid";
import { CnpjNumber } from "./value-objects/cnpj-number";
import { DeclaredBilling } from "./value-objects/declared-billing";
import { IdClient } from "./value-objects/id-client";
import { NameAddress } from "./value-objects/name-address";
import { NumberPhone } from "./value-objects/number-phone";

export interface CompanyProps {
  idCompany: string;
  idClient: IdClient;
  cnpjNumber: CnpjNumber;
  cnpjAddress: NameAddress;
  cnpjPhone: NumberPhone;
  declaredBilling: DeclaredBilling;
  statusCompany: string;
  createAt: Date;
  updateAt?: Date | null;
}

export class Company {
  private props: CompanyProps;
  constructor(
    props: Replace<
      CompanyProps,
      {
        idCompany?: string;
        statusCompany?: string;
        createAt?: Date;
        updateAt?: Date | null;
      }
    >
  ) {
    this.props = {
      ...props,
      idCompany: props.idCompany ?? uuid(),
      statusCompany: props.statusCompany ?? "activated",
      createAt: props.createAt ?? new Date(),
      updateAt: props.updateAt ?? null,
    };
  }

  public get idCompany() {
    return this.props.idCompany;
  }
  public get idClient() {
    return this.props.idClient;
  }
  public set idClient(idClient: IdClient) {
    this.props.idClient = idClient;
  }

  public get cnpjNumber() {
    return this.props.cnpjNumber;
  }
  public set cnpjNumber(cnpjNumber: CnpjNumber) {
    this.props.cnpjNumber = cnpjNumber;
  }

  public get cnpjAddress() {
    return this.props.cnpjAddress;
  }
  public set cnpjAddress(cnpjAddress: NameAddress) {
    this.props.cnpjAddress = cnpjAddress;
  }

  public get cnpjPhone() {
    return this.props.cnpjPhone;
  }
  public set cnpjPhone(cnpjPhone: NumberPhone) {
    this.props.cnpjPhone = cnpjPhone;
  }

  public get declaredBilling() {
    return this.props.declaredBilling;
  }
  public set declaredBilling(declaredBilling: DeclaredBilling) {
    this.props.declaredBilling = declaredBilling;
  }

  public get createAt() {
    return this.props.createAt;
  }
  public get updateAt() {
    return this.props.updateAt;
  }

  public get statusCompany() {
    return this.props.statusCompany;
  }
  public activeCompany() {
    this.props.statusCompany = "activated";
  }
  public disableCompany() {
    this.props.statusCompany = "disabled";
  }
  public update() {
    this.props.updateAt = new Date();
  }
}
