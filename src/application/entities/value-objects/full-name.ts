import { z } from "zod";

export class FullName {
  private readonly fullName: string;

  get value(): string {
    return this.fullName;
  }

  private validateFullNameParse(fullName: string): boolean {
    const schemaValid = z
      .string()
      .regex(/^[a-zA-Z\u00C0-\u00FF\s]{10,}$/)
      .safeParse(fullName).success;
    return schemaValid;
  }

  constructor(fullName: string) {
    const isFullNameValid = this.validateFullNameParse(fullName);

    if (!isFullNameValid) {
      throw new Error("Fullname is not correct.");
    }

    this.fullName = fullName;
  }
}
