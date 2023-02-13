import { NotFound } from "@application/use-cases/errors/not-found";
import { FindCompanyPerIdClientUseCase } from "@application/use-cases/find-company-per-id-client-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdClientRequestDTO } from "../dtos/id-client-request-dto";
import { CompanyViewModel } from "../view-models/company-view-model";

export class FindCompanyPerIdClientController {
  constructor(
    private findCompanyPerIdClientUseCase: FindCompanyPerIdClientUseCase
  ) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id: id_client } = request.params as IdClientRequestDTO;
      const { company } = await this.findCompanyPerIdClientUseCase.execute(
        id_client
      );

      return reply
        .status(200)
        .send(company.map(CompanyViewModel.returnCompanyToHTTP));
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(CompanyViewModel.notFoundToHTTP("Company not found"));
    }
  }
}
