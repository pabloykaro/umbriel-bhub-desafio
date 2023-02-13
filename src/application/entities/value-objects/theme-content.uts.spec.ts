import { ThemeContent } from "./theme-content";

describe("Case test value objects theme content", () => {
  it("should be able to create theme content", () => {
    const themeContent = new ThemeContent("finances");
    expect(themeContent).toBeTruthy();
  });
});
