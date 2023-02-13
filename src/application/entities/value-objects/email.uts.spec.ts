import { Email } from "./email";

describe("Case test value objects email", () => {
  it("should be able to create email", () => {
    const email = new Email("pabloykaro9@gmail.com");
    expect(email).toBeTruthy();
  });

  it("should be not able to create email", () => {
    expect(() => new Email("pabloykaro9gmail.com")).toThrow();
  });
});
