import { DisableCompanyUseCase } from "@application/use-cases/disable-company-use-case";
import { AlreadyActivated } from "@application/use-cases/errors/already-activated";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdCompanyRequestDTO } from "../dtos/id-company-request-dto";
import { CompanyViewModel } from "../view-models/company-view-model";

export class DisableCompanyController {
  constructor(private disableCompanyUseCase: DisableCompanyUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdCompanyRequestDTO;
      await this.disableCompanyUseCase.execute(id);
      return reply.status(200).send(
        CompanyViewModel.successCompanyToHTTP({
          type_action: "activated",
          status: "Company disabled with success.",
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
            type_conflict: "Company is already disabled.",
          })
        );
    }
  }
}
