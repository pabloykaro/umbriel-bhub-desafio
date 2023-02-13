import { CreateCompanyUseCase } from "@application/use-cases/create-company-use-case";
import { AlreadyExist } from "@application/use-cases/errors/already-exist";
import { NotFound } from "@application/use-cases/errors/not-found";
import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyRequestDTO } from "../dtos/company-request-dto";
import { CompanyViewModel } from "../view-models/company-view-model";
export class CreateCompanyController {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        id_client,
        cnpj_number,
        cnpj_address,
        cnpj_phone,
        declared_billing,
      } = request.body as CompanyRequestDTO;
      const { companyEntity } = await this.createCompanyUseCase.execute({
        idClient: id_client,
        cnpjNumber: cnpj_number,
        cnpjAddress: cnpj_address,
        cnpjPhone: cnpj_phone,
        declaredBilling: declared_billing,
      });

      return reply
        .status(201)
        .send(CompanyViewModel.returnCompanyToHTTP(companyEntity));
    } catch (err) {
      if (err instanceof AlreadyExist)
        return reply.status(409).send(
          CompanyViewModel.conflictCompanyToHTTP({
            type_conflict: "Company already exists.",
          })
        );
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
