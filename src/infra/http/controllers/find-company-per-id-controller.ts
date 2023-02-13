import { NotFound } from "@application/use-cases/errors/not-found";
import { FindCompanyPerIdUseCase } from "@application/use-cases/find-company-per-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdCompanyRequestDTO } from "../dtos/id-company-request-dto";
import { CompanyViewModel } from "../view-models/company-view-model";

export class FindCompanyPerIdController {
  constructor(private findCompanyPerIdUseCase: FindCompanyPerIdUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdCompanyRequestDTO;
      const { company } = await this.findCompanyPerIdUseCase.execute(id);

      return reply
        .status(200)
        .send(CompanyViewModel.returnCompanyToHTTP(company));
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(CompanyViewModel.notFoundToHTTP("Company not found"));
    }
  }
}
