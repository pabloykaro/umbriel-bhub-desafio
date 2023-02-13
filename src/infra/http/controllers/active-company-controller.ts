import { ActiveCompanyUseCase } from "@application/use-cases/active-company-use-case";
import { AlreadyActivated } from "@application/use-cases/errors/already-activated";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdCompanyRequestDTO } from "../dtos/id-company-request-dto";
import { CompanyViewModel } from "../view-models/company-view-model";

export class ActiveCompanyController {
  constructor(private activeCompanyUseCase: ActiveCompanyUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdCompanyRequestDTO;
      await this.activeCompanyUseCase.execute(id);
      return reply.status(200).send(
        CompanyViewModel.successCompanyToHTTP({
          type_action: "activated",
          status: "Company activated with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(CompanyViewModel.notFoundToHTTP("Company not found."));

      if (err instanceof AlreadyActivated)
        return reply.status(409).send(
          CompanyViewModel.conflictCompanyToHTTP({
            type_conflict: "Company is already activated.",
          })
        );
    }
  }
}
