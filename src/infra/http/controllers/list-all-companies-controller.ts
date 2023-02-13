import { NotFound } from "@application/use-cases/errors/not-found";
import { ListAllCompaniesUseCase } from "@application/use-cases/list-all-companies-use-case";
import { FastifyReply } from "fastify";
import { CompanyViewModel } from "../view-models/company-view-model";

export class ListAllCompaniesController {
  constructor(private listAllCompaniesUseCase: ListAllCompaniesUseCase) {}
  async handle(reply: FastifyReply) {
    try {
      const { listOfCompanies } = await this.listAllCompaniesUseCase.execute();

      return reply
        .status(200)
        .send(listOfCompanies.map(CompanyViewModel.returnCompanyToHTTP));
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(CompanyViewModel.notFoundToHTTP("Companies not found."));
    }
  }
}
