import { Subscriber } from "./subscriber";
import { Email } from "./value-objects/email";
import { FullName } from "./value-objects/full-name";
import { ThemeContent } from "./value-objects/theme-content";

describe("Case test entity subscribe", () => {
  it("should be able to create subscribe", () => {
    const subscribe = new Subscriber({
      email: new Email("pabloykaro9@gmail.com"),
      fullName: new FullName("Pablo Ykaro Barbosa Martins"),
      themeContent: new ThemeContent("finances"),
    });
    expect(subscribe).toBeTruthy();
  });
});
