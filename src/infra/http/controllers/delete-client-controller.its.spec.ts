import app from "@infra/app";
import { v4 as uuid } from "uuid";

describe("Suit test controllers", () => {
  it("Should be able to delete client", async () => {
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

    const deleteClient = await app.inject({
      method: "DELETE",
      url: `/clients/${idClient}`,
    });
    expect(deleteClient.statusCode).toEqual(200);
    expect(JSON.parse(deleteClient.body).data.status).toEqual(
      "Client deleted with success."
    );
  });

  it("Should be not able to delete client", async () => {
    const idClient = uuid();

    const deleteClient = await app.inject({
      method: "DELETE",
      url: `/clients/${idClient}`,
    });
    expect(deleteClient.statusCode).toEqual(404);
    expect(JSON.parse(deleteClient.body).data.status).toEqual(
      "Client not found."
    );
  });
});
