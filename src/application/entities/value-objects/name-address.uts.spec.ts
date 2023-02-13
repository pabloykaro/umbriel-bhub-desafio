import { NameAddress } from "./name-address";

describe("Case test value objects name address", () => {
  it("should be able to create name address", () => {
    const nameAddress = new NameAddress("Rua Coronel Cicero Nogueira 399");
    expect(nameAddress).toBeTruthy();
  });

  it("should be not able to create name address", () => {
    expect(() => new NameAddress("")).toThrow();
  });
});
