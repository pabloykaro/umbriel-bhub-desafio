import app from "@infra/app";
import { v4 as uuid } from "uuid";

describe("Suit test controllers", () => {
  it("Should be able to change client", async () => {
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
    const responseChangeClient = await app.inject({
      method: "PUT",
      url: `/clients/${idClient}`,
      payload: {
        email: "joaoronaldo9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });

    expect(responseChangeClient.statusCode).toEqual(200);
    expect(JSON.parse(responseChangeClient.body).data.status).toEqual(
      "Client updated with success."
    );
  });

  it("Should be not able to change client with fields invalids", async () => {
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
    const responseChangeClient = await app.inject({
      method: "PUT",
      url: `/clients/${idClient}`,
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });

    expect(responseChangeClient.statusCode).toEqual(400);
    expect(JSON.parse(responseChangeClient.body).data.status).toEqual(
      "Unable to create a client, fields invalid."
    );
  });

  it("Should be not able to change client with id client not exists", async () => {
    const idClient = uuid();
    const responseChangeClient = await app.inject({
      method: "PUT",
      url: `/clients/${idClient}`,
      payload: {
        email: "joaoronaldo9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });

    expect(responseChangeClient.statusCode).toEqual(404);
    expect(JSON.parse(responseChangeClient.body).data.status).toEqual(
      "Client not found."
    );
  });
});
