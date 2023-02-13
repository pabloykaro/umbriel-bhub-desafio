import { FullName } from "./full-name";

describe("Case test value objects full name", () => {
  it("should be able to create full name", () => {
    const fullName = new FullName("Pablo Ykaro Barbosa Martins");
    expect(fullName).toBeTruthy();
  });

  it("should be not able to create full name", () => {
    expect(() => new FullName("Pablo")).toThrow();
  });
});
