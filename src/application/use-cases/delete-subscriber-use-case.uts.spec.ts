import { makeCreateClient } from "@test/factories/client-factory";
import { makeCreateSubscriber } from "@test/factories/subscriber-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { InMemorySubscriberRepository } from "@test/repositories/in-memory-subscriber-repository";
import { DeleteSubscriberUseCase } from "./delete-subscriber-use-case";

let inMemorySubscriberRepository: InMemorySubscriberRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let deleteSubscriberUseCase: DeleteSubscriberUseCase;

describe("Tests reference in the use cases subscriber", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    inMemorySubscriberRepository = new InMemorySubscriberRepository();
    deleteSubscriberUseCase = new DeleteSubscriberUseCase(
      inMemorySubscriberRepository
    );
  });

  it("Should be able to delete subscriber", async () => {
    const createClient = makeCreateClient();
    await inMemoryClientRepository.create(createClient);
    const newSubscriber = makeCreateSubscriber();
    await inMemorySubscriberRepository.create(newSubscriber);
    await deleteSubscriberUseCase.execute(
      newSubscriber.email.value,
      newSubscriber.themeContent.value
    );
    const sut = await inMemorySubscriberRepository.findById(newSubscriber.id);
    expect(sut).toBe(null);
  });
  it("Should be not able to delete subscriber because not went found", () => {
    expect(async () => {
      const newSubscriber = makeCreateSubscriber();
      await deleteSubscriberUseCase.execute(
        newSubscriber.email.value,
        newSubscriber.themeContent.value
      );
    }).rejects.toThrow();
  });
});
