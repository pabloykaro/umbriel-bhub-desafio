import { makeCreateClient } from "@test/factories/client-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { DisableClientUseCase } from "./disable-client-use-case";

let inMemoryCreateClientRepository: InMemoryClientRepository;
let disableClientUseCase: DisableClientUseCase;

describe("Tests reference in the use cases client", () => {
  beforeEach(() => {
    inMemoryCreateClientRepository = new InMemoryClientRepository();
    disableClientUseCase = new DisableClientUseCase(
      inMemoryCreateClientRepository
    );
  });

  it("Should be able to disable client", async () => {
    const newClient = makeCreateClient();
    await inMemoryCreateClientRepository.create(newClient);
    await disableClientUseCase.execute(newClient.id);
    const sut = await inMemoryCreateClientRepository.findById(newClient.id);
    expect(sut?.statusAccount).toEqual("disabled");
  });

  it("Should be able to disable client because not went found", () => {
    expect(async () => {
      const newClient = makeCreateClient();
      await inMemoryCreateClientRepository.create(newClient);
      const idNotExist = `${newClient.id}1`;
      await disableClientUseCase.execute(idNotExist);
    }).rejects.toThrow();
  });

  it("Should be not able to disable client because already disabled", () => {
    expect(async () => {
      const newClient = makeCreateClient();
      await inMemoryCreateClientRepository.create(newClient);
      await disableClientUseCase.execute(newClient.id);
      await disableClientUseCase.execute(newClient.id);
    }).rejects.toThrow();
  });
});
