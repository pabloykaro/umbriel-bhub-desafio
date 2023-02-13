import { z } from "zod";

export class IdClient {
  private readonly idClient: string;

  get value(): string {
    return this.idClient;
  }

  private validateIdClientParse(idClient: string): boolean {
    const schemaValid = z.string().uuid().safeParse(idClient).success;
    return schemaValid;
  }

  constructor(idClient: string) {
    const isIdClientValid = this.validateIdClientParse(idClient);

    if (!isIdClientValid) {
      throw new Error("IdClient is not uuid.");
    }

    this.idClient = idClient;
  }
}
