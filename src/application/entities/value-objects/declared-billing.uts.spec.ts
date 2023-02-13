import { DeclaredBilling } from "./declared-billing";

describe("Case test value objects declared billing", () => {
  it("should be able to create declared billing", () => {
    const declaredBilling = new DeclaredBilling(1500);
    expect(declaredBilling).toBeTruthy();
  });
});
