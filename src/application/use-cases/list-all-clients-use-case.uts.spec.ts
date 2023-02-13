import { makeCreateClient } from "@test/factories/client-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { ListAllClientsUseCase } from "./list-all-clients-use-case";

let inMemoryCreateClientRepository: InMemoryClientRepository;
let listAllClientsUseCase: ListAllClientsUseCase;

describe("Tests reference in the use cases client", () => {
  beforeEach(() => {
    inMemoryCreateClientRepository = new InMemoryClientRepository();
    listAllClientsUseCase = new ListAllClientsUseCase(
      inMemoryCreateClientRepository
    );
  });

  it("Should be able to list many clients", async () => {
    await inMemoryCreateClientRepository.create(makeCreateClient());
    const sut = await listAllClientsUseCase.execute();
    expect(sut).toBeTruthy();
  });
  it("Should be not able to list many clients", async () => {
    const { listOfClients } = await listAllClientsUseCase.execute();
    expect(listOfClients).toEqual([]);
  });
});
