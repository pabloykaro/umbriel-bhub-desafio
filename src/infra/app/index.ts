import cors from "@fastify/cors";
import { http } from "@infra/http";
import Fastify from "fastify";

const app = Fastify({ logger: false });
export default app
  .register(cors, {
    origin: true,
  })
  .register(http);
