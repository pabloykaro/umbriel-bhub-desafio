import { v4 as uuid } from "uuid";
import { IdClient } from "./id-client";

describe("Case test value objects id client", () => {
  it("should be able to create create id client", () => {
    const idClient = new IdClient(uuid());
    expect(idClient).toBeTruthy();
  });
});
