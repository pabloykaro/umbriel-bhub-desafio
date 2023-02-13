import { makeCreateClient } from "@test/factories/client-factory";
import { makeCreateSubscriber } from "@test/factories/subscriber-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { InMemorySubscriberRepository } from "@test/repositories/in-memory-subscriber-repository";
import { FindSubscriberPerEmailUseCase } from "./find-subscribers-per-email-use-case";

let inMemorySubscriberRepository: InMemorySubscriberRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let findSubscriberPerEmailUseCase: FindSubscriberPerEmailUseCase;

describe("Tests reference in the use cases subscriber", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    inMemorySubscriberRepository = new InMemorySubscriberRepository();
    findSubscriberPerEmailUseCase = new FindSubscriberPerEmailUseCase(
      inMemorySubscriberRepository
    );
  });

  it("Should be able to find subscribers per email", async () => {
    const createClient = makeCreateClient();
    const createSubscriber = makeCreateSubscriber();
    await inMemoryClientRepository.create(createClient);
    await inMemorySubscriberRepository.create(createSubscriber);
    const { responseDataAboutSubscribe } =
      await findSubscriberPerEmailUseCase.execute(createSubscriber.email.value);
    expect(responseDataAboutSubscribe).toBeTruthy();
  });
});
