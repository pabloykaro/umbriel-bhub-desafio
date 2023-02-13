import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { CreateClientUseCase } from "./create-client-use-case";

let inMemoryCreateClientRepository: InMemoryClientRepository;
let createClientUseCase: CreateClientUseCase;

describe("Tests reference in the use cases client", () => {
  beforeEach(() => {
    inMemoryCreateClientRepository = new InMemoryClientRepository();
    createClientUseCase = new CreateClientUseCase(
      inMemoryCreateClientRepository
    );
  });

  it("Should be able to create new client", async () => {
    const data = {
      email: "pabloykaro9@gmail.com",
      fullName: "Pablo Ykaro Barbosa Martins",
      personalAddress: "Coronel Cícero Nogueira",
      personalPhone: "85994192707",
    };

    const response = await createClientUseCase.execute(data);
    expect(response).toBeTruthy();
  });

  it("Should be not able to create new client", () => {
    expect(async () => {
      const data = {
        email: "pabloykaro9@gmail.com",
        fullName: "Pablo Ykaro Barbosa Martins",
        personalAddress: "Coronel Cícero Nogueira",
        personalPhone: "85994192707",
      };
      await createClientUseCase.execute(data);
      await createClientUseCase.execute(data);
    }).rejects.toThrow();
  });
});
