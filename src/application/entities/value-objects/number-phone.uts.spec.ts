import { NumberPhone } from "./number-phone";

describe("Case test value objects number phone", () => {
  it("should be able to create personal phone", () => {
    const personalPhone = new NumberPhone("85994192707");
    expect(personalPhone).toBeTruthy();
  });

  it("should be not able to create number phone", () => {
    expect(() => new NumberPhone("0P5994192707")).toThrow();
  });
});
