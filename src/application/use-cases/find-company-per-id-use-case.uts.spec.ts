import { makeCreateCompany } from "@test/factories/company-factory";
import { InMemoryCompanyRepository } from "@test/repositories/in-memory-company-repository";
import { FindCompanyPerIdUseCase } from "./find-company-per-id-use-case";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let findCompanyPerIdUseCase: FindCompanyPerIdUseCase;

describe("Tests reference in the use cases company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    findCompanyPerIdUseCase = new FindCompanyPerIdUseCase(
      inMemoryCompanyRepository
    );
  });

  it("Should be able to return company per id", async () => {
    const newCompany = makeCreateCompany();
    await inMemoryCompanyRepository.create(newCompany);
    const sut = await findCompanyPerIdUseCase.execute(newCompany.idCompany);
    expect(sut).toBeTruthy();
  });
  it("Should be not able to return company per id because not went found", async () => {
    expect(async () => {
      const newCompany = makeCreateCompany();
      const idNotExist = `${newCompany.idCompany}1`;
      await findCompanyPerIdUseCase.execute(idNotExist);
    }).rejects.toThrow;
  });
});
