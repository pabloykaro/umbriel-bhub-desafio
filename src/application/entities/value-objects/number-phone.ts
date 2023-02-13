import { z } from "zod";

export class NumberPhone {
  private readonly numberPhone: string;

  get value(): string {
    return this.numberPhone;
  }

  private validateNumberPhoneParse(numberPhone: string): boolean {
    const schemaValid = z
      .string()
      .regex(/^\d{11}$/)
      .safeParse(numberPhone).success;
    return schemaValid;
  }

  constructor(numberPhone: string) {
    const isNumberPhoneValid = this.validateNumberPhoneParse(numberPhone);

    if (!isNumberPhoneValid) {
      throw new Error("number phone is not correct.");
    }

    this.numberPhone = numberPhone;
  }
}
