import { makeCreateClient } from "@test/factories/client-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { FindClientPerIdUseCase } from "./find-client-per-id-use-case";

let inMemoryCreateClientRepository: InMemoryClientRepository;
let findClientPerIdUseCase: FindClientPerIdUseCase;

describe("Tests reference in the use cases client", () => {
  beforeEach(() => {
    inMemoryCreateClientRepository = new InMemoryClientRepository();
    findClientPerIdUseCase = new FindClientPerIdUseCase(
      inMemoryCreateClientRepository
    );
  });

  it("Should be able to return client per id", async () => {
    const newClient = makeCreateClient();
    await inMemoryCreateClientRepository.create(newClient);
    const sut = await findClientPerIdUseCase.execute(newClient.id);
    expect(sut).toBeTruthy();
  });
  it("Should be not able to return client per id  because not went found", async () => {
    expect(async () => {
      const newClient = makeCreateClient();
      const idNotExist = `${newClient.id}1`;
      await findClientPerIdUseCase.execute(idNotExist);
    }).rejects.toThrow;
  });
});
