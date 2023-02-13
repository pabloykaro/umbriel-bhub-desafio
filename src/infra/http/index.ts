import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { activeClientController } from "./modules/active-client-module";
import { activeCompanyController } from "./modules/active-company-module";
import { changeClientController } from "./modules/change-client-module";
import { changeCompanyController } from "./modules/change-company-module";
import { createClientController } from "./modules/create-client-module";
import { createCompanyController } from "./modules/create-company-module";
import { createSubscriberController } from "./modules/create-subscriber-module";
import { deleteClientController } from "./modules/delete-client-module";
import { deleteCompanyController } from "./modules/delete-company-module";
import { deleteSubscriberController } from "./modules/delete-subscriber-module";
import { disableClientController } from "./modules/disable-client-module";
import { disableCompanyController } from "./modules/disable-company-module";
import { findClientPerIdController } from "./modules/find-client-per-id-module";
import { findCompanyPerIdClientController } from "./modules/find-company-per-id-client-module";
import { findCompanyPerIdController } from "./modules/find-company-per-id-module";
import { findSubscribePerIdController } from "./modules/find-subscribe-per-id-module";
import { findSubscribePerEmailController } from "./modules/find-subscribers-per-email-module";
import { listAllClientsController } from "./modules/list-all-clients-modules";
import { listAllCompaniesController } from "./modules/list-all-companies-modules";
import { listAllSubscribersController } from "./modules/list-all-subscribers-module";

export async function http(fastifyRoute: FastifyInstance) {
  fastifyRoute.post(
    "/clients",
    (request: FastifyRequest, reply: FastifyReply) =>
      createClientController.handle(request, reply)
  );

  fastifyRoute.get("/clients", (request: FastifyRequest, reply: FastifyReply) =>
    listAllClientsController.handle(reply)
  );
  fastifyRoute.get(
    "/clients/:id",
    (request: FastifyRequest, reply: FastifyReply) =>
      findClientPerIdController.handle(request, reply)
  );
  fastifyRoute.patch(
    "/clients/:id/active",
    (request: FastifyRequest, reply: FastifyReply) =>
      activeClientController.handle(request, reply)
  );
  fastifyRoute.patch(
    "/clients/:id/disable",
    (request: FastifyRequest, reply: FastifyReply) =>
      disableClientController.handle(request, reply)
  );
  fastifyRoute.put(
    "/clients/:id",
    (request: FastifyRequest, reply: FastifyReply) =>
      changeClientController.handle(request, reply)
  );
  fastifyRoute.delete(
    "/clients/:id",
    (request: FastifyRequest, reply: FastifyReply) =>
      deleteClientController.handle(request, reply)
  );

  fastifyRoute.post(
    "/companies",
    (request: FastifyRequest, reply: FastifyReply) =>
      createCompanyController.handle(request, reply)
  );
  fastifyRoute.get(
    "/companies",
    (request: FastifyRequest, reply: FastifyReply) =>
      listAllCompaniesController.handle(reply)
  );
  fastifyRoute.get(
    "/companies/:id",
    (request: FastifyRequest, reply: FastifyReply) =>
      findCompanyPerIdController.handle(request, reply)
  );
  fastifyRoute.get(
    "/companies/:id_client/lists",
    (request: FastifyRequest, reply: FastifyReply) =>
      findCompanyPerIdClientController.handle(request, reply)
  );
  fastifyRoute.put(
    "/companies/:id",
    (request: FastifyRequest, reply: FastifyReply) =>
      changeCompanyController.handle(request, reply)
  );
  fastifyRoute.patch(
    "/companies/:id/active",
    (request: FastifyRequest, reply: FastifyReply) =>
      activeCompanyController.handle(request, reply)
  );
  fastifyRoute.patch(
    "/companies/:id/disable",
    (request: FastifyRequest, reply: FastifyReply) =>
      disableCompanyController.handle(request, reply)
  );
  fastifyRoute.delete(
    "/companies/:id",
    (request: FastifyRequest, reply: FastifyReply) =>
      deleteCompanyController.handle(request, reply)
  );

  fastifyRoute.post(
    "/subscribers",
    (request: FastifyRequest, reply: FastifyReply) =>
      createSubscriberController.handle(request, reply)
  );
  fastifyRoute.get(
    "/subscribers",
    (request: FastifyRequest, reply: FastifyReply) =>
      listAllSubscribersController.handle(reply)
  );
  fastifyRoute.delete(
    "/subscribers",
    (request: FastifyRequest, reply: FastifyReply) =>
      deleteSubscriberController.handle(request, reply)
  );
  fastifyRoute.get(
    "/subscribers/:id",
    (request: FastifyRequest, reply: FastifyReply) =>
      findSubscribePerIdController.handle(request, reply)
  );
  fastifyRoute.get(
    "/subscribers/:email/lists",
    (request: FastifyRequest, reply: FastifyReply) =>
      findSubscribePerEmailController.handle(request, reply)
  );
}
