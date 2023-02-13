import { makeCreateClient } from "@test/factories/client-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { DeleteClientUseCase } from "./delete-client-use-case";

let inMemoryCreateClientRepository: InMemoryClientRepository;
let deleteClientUseCase: DeleteClientUseCase;

describe("Tests reference in the use cases client", () => {
  beforeEach(() => {
    inMemoryCreateClientRepository = new InMemoryClientRepository();
    deleteClientUseCase = new DeleteClientUseCase(
      inMemoryCreateClientRepository
    );
  });

  it("Should be able to delete client", async () => {
    const newClient = makeCreateClient();
    await inMemoryCreateClientRepository.create(newClient);
    await deleteClientUseCase.execute(newClient.id);
    const sut = await inMemoryCreateClientRepository.findById(newClient.id);
    expect(sut).toBe(null);
  });
  it("Should be not able to delete client because not went found", () => {
    expect(async () => {
      const newClient = makeCreateClient();
      await inMemoryCreateClientRepository.create(newClient);
      const idNotExist = `${newClient.id}1`;
      await deleteClientUseCase.execute(idNotExist);
    }).rejects.toThrow();
  });
});
