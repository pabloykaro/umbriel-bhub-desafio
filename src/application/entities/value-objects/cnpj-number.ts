import { z } from "zod";

export class CnpjNumber {
  private readonly cnpjNumber: string;

  get value(): string {
    return this.cnpjNumber;
  }

  private validateCnpjNumberParse(cnpjNumber: string): boolean {
    const schemaValid = z
      .string()
      .regex(/^[0-9]{14}$/)
      .safeParse(cnpjNumber).success;
    return schemaValid;
  }

  constructor(cnpjNumber: string) {
    const isCnpjNumberValid = this.validateCnpjNumberParse(cnpjNumber);

    if (!isCnpjNumberValid) {
      throw new Error("Cnpj is not correct.");
    }

    this.cnpjNumber = cnpjNumber;
  }
}
