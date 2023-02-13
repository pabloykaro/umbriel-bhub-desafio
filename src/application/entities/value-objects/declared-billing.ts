import { z } from "zod";

export class DeclaredBilling {
  private readonly declaredBilling: number;

  get value(): number {
    return this.declaredBilling;
  }

  private validateDeclaredBillingParse(declaredBilling: number): boolean {
    const schemaValid = z
      .number()
      .nonnegative()
      .safeParse(declaredBilling).success;
    return schemaValid;
  }

  constructor(declaredBilling: number) {
    const isDeclaredBillingValid =
      this.validateDeclaredBillingParse(declaredBilling);

    if (!isDeclaredBillingValid) {
      throw new Error("Declared billing is not correct.");
    }

    this.declaredBilling = declaredBilling;
  }
}
