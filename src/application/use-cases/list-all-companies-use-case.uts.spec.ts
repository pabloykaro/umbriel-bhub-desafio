import { makeCreateCompany } from "@test/factories/company-factory";
import { InMemoryCompanyRepository } from "@test/repositories/in-memory-company-repository";
import { ListAllCompaniesUseCase } from "./list-all-companies-use-case";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let listAllCompaniesUseCase: ListAllCompaniesUseCase;

describe("Tests reference in the use cases company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    listAllCompaniesUseCase = new ListAllCompaniesUseCase(
      inMemoryCompanyRepository
    );
  });

  it("Should be able to list many companies", async () => {
    await inMemoryCompanyRepository.create(makeCreateCompany());
    const sut = await listAllCompaniesUseCase.execute();
    expect(sut).toBeTruthy();
  });
  it("Should be not able to list many companies", async () => {
    const { listOfCompanies } = await listAllCompaniesUseCase.execute();
    expect(listOfCompanies).toEqual([]);
  });
});
