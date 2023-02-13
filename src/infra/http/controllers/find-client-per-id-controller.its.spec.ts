import app from "@infra/app";
import { v4 as uuid } from "uuid";

describe("Suit test controllers", () => {
  it("Should be able to find client per id", async () => {
    const responseCreateClient = await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });
    const idClient = JSON.parse(responseCreateClient.body).id;

    const responseFindClientPerId = await app.inject({
      method: "GET",
      url: `/clients/${idClient}`,
    });
    expect(responseFindClientPerId.statusCode).toEqual(200);
    expect(JSON.parse(responseFindClientPerId.body)).toHaveProperty("id");
  });
  it("Should be not able to find client per id", async () => {
    const idClient = uuid();

    const responseFindClientPerId = await app.inject({
      method: "GET",
      url: `/clients/${idClient}`,
    });
    expect(responseFindClientPerId.statusCode).toEqual(404);
    expect(JSON.parse(responseFindClientPerId.body).data.status).toEqual(
      "Client not found."
    );
  });
});
