import { makeCreateClient } from "@test/factories/client-factory";
import { makeCreateSubscriber } from "@test/factories/subscriber-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { InMemorySubscriberRepository } from "@test/repositories/in-memory-subscriber-repository";
import { FindSubscriberPerIdUseCase } from "./find-subscriber-per-id-use-case";

let inMemorySubscriberRepository: InMemorySubscriberRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let findSubscriberPerIdUseCase: FindSubscriberPerIdUseCase;

describe("Tests reference in the use cases subscriber", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    inMemorySubscriberRepository = new InMemorySubscriberRepository();
    findSubscriberPerIdUseCase = new FindSubscriberPerIdUseCase(
      inMemorySubscriberRepository
    );
  });

  it("Should be able to find subscriber per id", async () => {
    const createClient = makeCreateClient();
    const createSubscriber = makeCreateSubscriber();
    await inMemoryClientRepository.create(createClient);
    await inMemorySubscriberRepository.create(createSubscriber);
    const { responseDataAboutSubscribe } =
      await findSubscriberPerIdUseCase.execute(createSubscriber.id);
    expect(responseDataAboutSubscribe).toBeTruthy();
  });
  it("Should be not able to find subscriber per id", async () => {
    expect(async () => {
      const createSubscriber = makeCreateSubscriber();
      await findSubscriberPerIdUseCase.execute(createSubscriber.id);
    }).rejects.toThrow();
  });
});
