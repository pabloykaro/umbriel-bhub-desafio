import app from "@infra/app";
import { v4 as uuid } from "uuid";

describe("Suit test controllers", () => {
  it("Should be able to active client", async () => {
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
    await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/disable`,
    });

    const activeClient = await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/active`,
    });
    expect(activeClient.statusCode).toEqual(200);
    expect(JSON.parse(activeClient.body).data.type_action).toEqual("activated");
  });

  it("Should be not able to active client with status active", async () => {
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
    const activeClient = await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/active`,
    });
    expect(activeClient.statusCode).toEqual(409);
    expect(JSON.parse(activeClient.body).data.type_conflict).toEqual(
      "Client is already activated."
    );
  });

  it("Should be not able to active client with id not exist", async () => {
    const idClient = uuid();
    const activeClient = await app.inject({
      method: "PATCH",
      url: `/clients/${idClient}/active`,
    });
    expect(activeClient.statusCode).toEqual(404);
    expect(JSON.parse(activeClient.body).data.status).toEqual(
      "Client not found."
    );
  });
});
