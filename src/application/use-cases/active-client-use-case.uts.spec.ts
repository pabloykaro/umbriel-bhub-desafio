import { makeCreateClient } from "@test/factories/client-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { ActiveClientUseCase } from "./active-client-use-case";

let inMemoryCreateClientRepository: InMemoryClientRepository;
let activeClientUseCase: ActiveClientUseCase;

describe("Tests reference in the use cases client", () => {
  beforeEach(() => {
    inMemoryCreateClientRepository = new InMemoryClientRepository();
    activeClientUseCase = new ActiveClientUseCase(
      inMemoryCreateClientRepository
    );
  });

  it("Should be able to active client", async () => {
    const newClient = makeCreateClient({
      statusAccount: "disabled",
    });
    await inMemoryCreateClientRepository.create(newClient);
    await activeClientUseCase.execute(newClient.id);
    const sut = await inMemoryCreateClientRepository.findById(newClient.id);

    expect(sut?.statusAccount).toEqual("activated");
  });

  it("Should be able to active client because not went found", () => {
    expect(async () => {
      const newClient = makeCreateClient();
      await inMemoryCreateClientRepository.create(newClient);
      const idNotExist = `${newClient.id}1`;
      await activeClientUseCase.execute(idNotExist);
    }).rejects.toThrow();
  });

  it("Should be not able to active client because already activated", () => {
    expect(async () => {
      const newClient = makeCreateClient();
      await inMemoryCreateClientRepository.create(newClient);
      await activeClientUseCase.execute(newClient.id);
      await activeClientUseCase.execute(newClient.id);
    }).rejects.toThrow();
  });
});
