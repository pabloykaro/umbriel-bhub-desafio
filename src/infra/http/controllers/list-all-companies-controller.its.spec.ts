import app from "@infra/app";

describe("Suit test controllers company", () => {
  it("Should be able to list companies", async () => {
    const createClient = await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });
    const idClient: string = JSON.parse(createClient.body).id;
    await app.inject({
      method: "POST",
      url: "/companies",
      payload: {
        id_client: idClient,
        cnpj_number: "11046411000134",
        cnpj_address: "Rua Aldenir 50",
        cnpj_phone: "85994192707",
        declared_billing: 1500.55,
      },
    });

    const sut = await app.inject({
      method: "GET",
      url: `/companies`,
    });
    expect(sut.statusCode).toEqual(200);
    expect(JSON.parse(sut.body)[0]).toHaveProperty("id");
  });
});
