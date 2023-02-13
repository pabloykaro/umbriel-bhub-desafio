import { CnpjNumber } from "./cnpj-number";

describe("Case test value objects cnpj number", () => {
  it("should be able to create cnpj number", () => {
    const cnpjNumber = new CnpjNumber("12506429000134");
    expect(cnpjNumber).toBeTruthy();
  });

  it("should be not able to create cnpj number", () => {
    expect(() => new CnpjNumber("12506429000")).toThrow();
  });
});
