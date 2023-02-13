import { z } from "zod";

export class NameAddress {
  private readonly nameAddress: string;

  get value(): string {
    return this.nameAddress;
  }

  private validateNameAddressParse(nameAddress: string): boolean {
    const schemaValid = z.string().min(3).safeParse(nameAddress).success;
    return schemaValid;
  }

  constructor(nameAddress: string) {
    const isNameAddressValid = this.validateNameAddressParse(nameAddress);

    if (!isNameAddressValid) {
      throw new Error("name address is not correct.");
    }

    this.nameAddress = nameAddress;
  }
}
