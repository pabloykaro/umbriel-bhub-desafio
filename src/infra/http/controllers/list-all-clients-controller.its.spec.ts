import app from "@infra/app";

describe("Suit test controllers", () => {
  it("Should be not able to list clients", async () => {
    const listClients = await app.inject({
      method: "GET",
      url: "/clients",
    });
  });

  it("Should be able to list clients", async () => {
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
    await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "joaosilva9@gmail.com",
        full_name: "Joao Silva Neto",
        personal_phone: "85994193030",
        personal_address: "Rua Coronel Cícero Nogueira 400",
      },
    });

    const listClients = await app.inject({
      method: "GET",
      url: `/clients`,
    });
    expect(listClients.statusCode).toEqual(200);
    expect(JSON.parse(listClients.body)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: JSON.parse(responseCreateClient.body).id,
        }),
      ])
    );
  });
});
