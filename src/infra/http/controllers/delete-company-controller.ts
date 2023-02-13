import { DeleteCompanyUseCase } from "@application/use-cases/delete-company-use-case";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdCompanyRequestDTO } from "../dtos/id-company-request-dto";
import { CompanyViewModel } from "../view-models/company-view-model";

export class DeleteCompanyController {
  constructor(private deleteCompanyUseCase: DeleteCompanyUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdCompanyRequestDTO;
      await this.deleteCompanyUseCase.execute(id);
      return reply.status(200).send(
        CompanyViewModel.successCompanyToHTTP({
          type_action: "deleted",
          status: "Company deleted with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(CompanyViewModel.notFoundToHTTP("Company not found."));
    }
  }
}
