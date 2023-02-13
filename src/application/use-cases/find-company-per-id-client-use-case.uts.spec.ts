import { makeCreateCompany } from "@test/factories/company-factory";
import { InMemoryCompanyRepository } from "@test/repositories/in-memory-company-repository";
import { FindCompanyPerIdClientUseCase } from "./find-company-per-id-client-use-case";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let findCompanyPerIdClientUseCase: FindCompanyPerIdClientUseCase;

describe("Tests reference in the use cases company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    findCompanyPerIdClientUseCase = new FindCompanyPerIdClientUseCase(
      inMemoryCompanyRepository
    );
  });

  it("Should be able to return company per id client", async () => {
    const newCompany = makeCreateCompany();
    await inMemoryCompanyRepository.create(newCompany);
    const sut = await findCompanyPerIdClientUseCase.execute(
      newCompany.idClient.value
    );
    expect(sut).toBeTruthy();
  });

  it("Should be not able to return company per id client because not went found", async () => {
    expect(async () => {
      const newCompany = makeCreateCompany();
      const idNotExist = `${newCompany.idClient.value}1`;
      await findCompanyPerIdClientUseCase.execute(idNotExist);
    }).rejects.toThrow;
  });
});
