import { makeCreateClient } from "@test/factories/client-factory";
import { makeCreateSubscriber } from "@test/factories/subscriber-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { InMemorySubscriberRepository } from "@test/repositories/in-memory-subscriber-repository";
import { CreateSubscriberUseCase } from "./create-subscriber-use-case";

let inMemorySubscriberRepository: InMemorySubscriberRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let createSubscriberUseCase: CreateSubscriberUseCase;

describe("Tests reference in the use cases subscribe", () => {
  beforeEach(() => {
    inMemorySubscriberRepository = new InMemorySubscriberRepository();
    inMemoryClientRepository = new InMemoryClientRepository();
    createSubscriberUseCase = new CreateSubscriberUseCase(
      inMemorySubscriberRepository,
      inMemoryClientRepository
    );
  });

  it("Should be able to create new subscriber", async () => {
    const createClient = makeCreateClient();
    await inMemoryClientRepository.create(createClient);
    const { email, fullName, themeContent } = makeCreateSubscriber();

    const response = await createSubscriberUseCase.execute({
      email: email.value,
      fullName: fullName.value,
      themeContent: themeContent.value,
    });
    expect(response).toBeTruthy();
  });

  it("Should be not able to create new subscriber with theme content already exist", () => {
    expect(async () => {
      const createClient = makeCreateClient();
      await inMemoryClientRepository.create(createClient);
      const { email, fullName, themeContent } = makeCreateSubscriber();

      await createSubscriberUseCase.execute({
        email: email.value,
        fullName: fullName.value,
        themeContent: themeContent.value,
      });
      await createSubscriberUseCase.execute({
        email: email.value,
        fullName: fullName.value,
        themeContent: themeContent.value,
      });
    }).rejects.toThrow();
  });

  it("Should be not able to create new subscriber with client without exist", () => {
    expect(async () => {
      const { email, fullName, themeContent } = makeCreateSubscriber();

      await createSubscriberUseCase.execute({
        email: email.value,
        fullName: fullName.value,
        themeContent: themeContent.value,
      });
    }).rejects.toThrow();
  });
});
