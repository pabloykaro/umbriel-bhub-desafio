import { makeCreateCompany } from "@test/factories/company-factory";
import { InMemoryCompanyRepository } from "@test/repositories/in-memory-company-repository";
import { DeleteCompanyUseCase } from "./delete-company-use-case";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let deleteCompanyUseCase: DeleteCompanyUseCase;

describe("Tests reference in the use cases company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    deleteCompanyUseCase = new DeleteCompanyUseCase(inMemoryCompanyRepository);
  });

  it("Should be able to delete company", async () => {
    const newCompany = makeCreateCompany();
    await inMemoryCompanyRepository.create(newCompany);
    await deleteCompanyUseCase.execute(newCompany.idCompany);
    const sut = await inMemoryCompanyRepository.findById(newCompany.idCompany);
    expect(sut).toBe(null);
  });
  it("Should be not able to delete company because not went found", () => {
    expect(async () => {
      const newCompany = makeCreateCompany();
      await inMemoryCompanyRepository.create(newCompany);
      const idNotExist = `${newCompany.idCompany}1`;
      await deleteCompanyUseCase.execute(idNotExist);
    }).rejects.toThrow();
  });
});
