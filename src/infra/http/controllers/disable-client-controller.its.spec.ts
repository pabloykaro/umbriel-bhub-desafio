import app from "@infra/app";
import { v4 as uuid } from "uuid";

describe("Suit test controllers", () => {
  it("Should be able to disable client", async () => {
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

    const disableClient = await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/disable`,
    });
    expect(disableClient.statusCode).toEqual(200);
    expect(JSON.parse(disableClient.body).data.type_action).toEqual("disabled");
  });

  it("Should be not able to disable client with status disable", async () => {
    const responseCreateClient = await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "joaosilva9@gmail.com",
        full_name: "Joao Silva Romario Dantas",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });
    const idClient = JSON.parse(responseCreateClient.body).id;
    await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/disable`,
    });
    const disableClient = await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/disable`,
    });
    expect(disableClient.statusCode).toEqual(409);
    expect(JSON.parse(disableClient.body).data.type_conflict).toEqual(
      "Client is already disabled."
    );
  });

  it("Should be not able to active client with id not exist", async () => {
    const idClient = uuid();
    const disableClient = await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/disable`,
    });
    expect(disableClient.statusCode).toEqual(404);
    expect(JSON.parse(disableClient.body).data.status).toEqual(
      "Client not found."
    );
  });
});
