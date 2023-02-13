import { ChangeCompanyUseCase } from "@application/use-cases/change-company-use-case";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyRequestDTO } from "../dtos/company-request-dto";
import { IdClientRequestDTO } from "../dtos/id-client-request-dto";
import { CompanyViewModel } from "../view-models/company-view-model";

export class ChangeCompanyController {
  constructor(private changeCompanyUseCase: ChangeCompanyUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as IdClientRequestDTO;
      const { cnpj_address, cnpj_phone, declared_billing } =
        request.body as Omit<CompanyRequestDTO, "id_client" | "cnpj_number">;
      await this.changeCompanyUseCase.execute({
        id,
        cnpjAddress: cnpj_address,
        cnpjPhone: cnpj_phone,
        declaredBilling: declared_billing,
      });
      return reply.status(200).send(
        CompanyViewModel.successCompanyToHTTP({
          type_action: "updated",
          status: "Company updated with success.",
        })
      );
    } catch (err) {
      if (err instanceof NotFound)
        return reply
          .status(404)
          .send(
            CompanyViewModel.notFoundToHTTP(
              "Company not create, client not found."
            )
          );

      return reply.status(400).send(CompanyViewModel.fieldInvalidToHTTP());
    }
  }
}
