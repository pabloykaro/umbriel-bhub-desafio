import { z } from "zod";

export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private validateEmailParse(email: string): boolean {
    const schemaValid = z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .safeParse(email).success;
    return schemaValid;
  }

  constructor(email: string) {
    const isEmailValid = this.validateEmailParse(email);

    if (!isEmailValid) {
      throw new Error("Email is not correct.");
    }

    this.email = email;
  }
}
