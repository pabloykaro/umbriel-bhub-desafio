import { makeCreateCompany } from "@test/factories/company-factory";
import { InMemoryCompanyRepository } from "@test/repositories/in-memory-company-repository";
import { ChangeCompanyUseCase } from "./change-company-use-case";

let inMemoryCompanyRepository: InMemoryCompanyRepository;
let changeCompanyUseCase: ChangeCompanyUseCase;

describe("Tests reference in the use cases company", () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    changeCompanyUseCase = new ChangeCompanyUseCase(inMemoryCompanyRepository);
  });

  it("Should be able to change company", async () => {
    const newCompany = makeCreateCompany();
    await inMemoryCompanyRepository.create(newCompany);
    await changeCompanyUseCase.execute({
      id: newCompany.idCompany,
      cnpjAddress: "Rua Santos Dummont 10",
      cnpjPhone: newCompany.cnpjPhone.value,
      declaredBilling: 1300,
    });
    const sut = await inMemoryCompanyRepository.findById(newCompany.idCompany);
    expect(sut?.update).not.toEqual(null);
  });

  it("Should be able to change company because not went found", () => {
    expect(async () => {
      const newCompany = makeCreateCompany();
      await inMemoryCompanyRepository.create(newCompany);
      const idNotExist = `${newCompany.idCompany}1`;
      await changeCompanyUseCase.execute({
        id: idNotExist,
        cnpjAddress: "Rua Santos Dummont 10",
        cnpjPhone: newCompany.cnpjPhone.value,
        declaredBilling: 1300,
      });
    }).rejects.toThrow();
  });
});
