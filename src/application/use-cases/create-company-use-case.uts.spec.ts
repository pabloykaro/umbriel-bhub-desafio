import { makeCreateClient } from "@test/factories/client-factory";
import { InMemoryClientRepository } from "@test/repositories/in-memory-client-repository";
import { InMemoryCompanyRepository } from "@test/repositories/in-memory-company-repository";
import { CreateCompanyUseCase } from "./create-company-use-case";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let createCompanyUseCase: CreateCompanyUseCase;

describe("Tests reference in the use cases company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    inMemoryClientRepository = new InMemoryClientRepository();
    createCompanyUseCase = new CreateCompanyUseCase(
      inMemoryCompanyRepository,
      inMemoryClientRepository
    );
  });

  it("Should be able to create new company", async () => {
    const createClient = makeCreateClient();
    await inMemoryClientRepository.create(createClient);
    const dataCompany = {
      idClient: createClient.id,
      cnpjNumber: "12506429000134",
      cnpjAddress: "Rua Coronel Cicero 399",
      cnpjPhone: "85994192707",
      declaredBilling: 1200,
    };

    const response = await createCompanyUseCase.execute(dataCompany);
    expect(response).toBeTruthy();
  });

  it("Should be not able to create new company with company already exist", () => {
    expect(async () => {
      const createClient = makeCreateClient();
      await inMemoryClientRepository.create(createClient);
      const data = {
        idClient: createClient.id,
        cnpjNumber: "12506429000134",
        cnpjAddress: "Rua Coronel Cicero 399",
        cnpjPhone: "85994192707",
        declaredBilling: 1200,
      };
      await createCompanyUseCase.execute(data);
      await createCompanyUseCase.execute(data);
    }).rejects.toThrow();
  });

  it("Should be not able to create new company with id client not exist", () => {
    expect(async () => {
      const data = {
        idClient: "f85b4ec2-04e9-4792-909f-15f83576ecb1",
        cnpjNumber: "12506429000134",
        cnpjAddress: "Rua Coronel Cicero 399",
        cnpjPhone: "85994192707",
        declaredBilling: 1200,
      };
      await createCompanyUseCase.execute(data);
    }).rejects.toThrow();
  });
});
