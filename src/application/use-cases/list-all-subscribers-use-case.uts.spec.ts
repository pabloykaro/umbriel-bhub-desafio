import { makeCreateClient } from "@test/factories/client-factory";
import { makeCreateSubscriber } from "@test/factories/subscriber-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { InMemorySubscriberRepository } from "@test/repositories/in-memory-subscriber-repository";
import { ListAllSubscribersUseCase } from "./list-all-subscribers-use-case";

let inMemorySubscriberRepository: InMemorySubscriberRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let listAllSubscribersUseCase: ListAllSubscribersUseCase;

describe("Tests reference in the use cases company", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    inMemorySubscriberRepository = new InMemorySubscriberRepository();
    listAllSubscribersUseCase = new ListAllSubscribersUseCase(
      inMemorySubscriberRepository
    );
  });

  it("Should be able to list many subscribers", async () => {
    const createClient = makeCreateClient();
    const createSubscriber = makeCreateSubscriber();
    await inMemoryClientRepository.create(createClient);
    await inMemorySubscriberRepository.create(createSubscriber);
    const { listOfSubscribers } = await listAllSubscribersUseCase.execute();
    expect(listOfSubscribers[0]).toBeTruthy();
  });
});
