import { z } from "zod";

export class ThemeContent {
  private readonly themeContent: string;

  get value(): string {
    return this.themeContent;
  }

  private validateThemeContentParse(themeContent: string): boolean {
    const schemaValid = z.string().min(3).safeParse(themeContent).success;
    return schemaValid;
  }

  constructor(themeContent: string) {
    const isThemeContentValid = this.validateThemeContentParse(themeContent);

    if (!isThemeContentValid) {
      throw new Error("theme content is not correct.");
    }

    this.themeContent = themeContent;
  }
}
