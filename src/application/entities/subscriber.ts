import { Replace } from "@application/helpers/Replace";
import { v4 as uuid } from "uuid";
import { Email } from "./value-objects/email";
import { FullName } from "./value-objects/full-name";
import { ThemeContent } from "./value-objects/theme-content";

export interface SubscriberProps {
  idSubscriber: string;
  email: Email;
  fullName: FullName;
  themeContent: ThemeContent;
  statusSubscriber: string;
  createAt: Date;
  updateAt?: Date | null;
}

export class Subscriber {
  private props: SubscriberProps;
  constructor(
    props: Replace<
      SubscriberProps,
      {
        idSubscriber?: string;
        statusSubscriber?: string;
        createAt?: Date;
        updateAt?: Date | null;
      }
    >
  ) {
    this.props = {
      ...props,
      idSubscriber: props.idSubscriber ?? uuid(),
      statusSubscriber: props.statusSubscriber ?? "subscriber",
      createAt: props.createAt ?? new Date(),
      updateAt: props.updateAt ?? null,
    };
  }

  public get id() {
    return this.props.idSubscriber;
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

  public get themeContent() {
    return this.props.themeContent;
  }
  public set themeContent(themeContent: ThemeContent) {
    this.props.themeContent = themeContent;
  }

  public get createAt() {
    return this.props.createAt;
  }
  public get updateAt() {
    return this.props.updateAt;
  }

  public get statusSubscriber() {
    return this.props.statusSubscriber;
  }
  public activeSubscriber() {
    this.props.statusSubscriber = "subscriber";
  }
  public disableSubscriber() {
    this.props.statusSubscriber = "unsubscriber";
  }
  public update() {
    this.props.updateAt = new Date();
  }
}
