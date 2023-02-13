import { makeCreateClient } from "@test/factories/client-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { ChangeClientUseCase } from "./change-client-use-case";

let inMemoryCreateClientRepository: InMemoryClientRepository;
let changeClientUseCase: ChangeClientUseCase;

describe("Tests reference in the use cases client", () => {
  beforeEach(() => {
    inMemoryCreateClientRepository = new InMemoryClientRepository();
    changeClientUseCase = new ChangeClientUseCase(
      inMemoryCreateClientRepository
    );
  });

  it("Should be able to change client", async () => {
    const newClient = makeCreateClient();
    await inMemoryCreateClientRepository.create(newClient);
    await changeClientUseCase.execute({
      id: newClient.id,
      email: "pablojoao@gmail.com",
      fullName: newClient.fullName.value,
      personalAddress: newClient.personalAddress.value,
      personalPhone: newClient.personalPhone.value,
    });
    const sut = await inMemoryCreateClientRepository.findById(newClient.id);
    expect(sut?.update).not.toEqual(null);
  });

  it("Should be able to change client because not went found", () => {
    expect(async () => {
      const newClient = makeCreateClient();
      await inMemoryCreateClientRepository.create(newClient);
      const idNotExist = `${newClient.id}1`;
      await changeClientUseCase.execute({
        id: idNotExist,
        email: "pablojoao@gmail.com",
        fullName: newClient.fullName.value,
        personalAddress: newClient.personalAddress.value,
        personalPhone: newClient.personalPhone.value,
      });
    }).rejects.toThrow();
  });
});
