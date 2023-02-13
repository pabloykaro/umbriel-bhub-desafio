import app from "@infra/app";

describe("Suit test controllers", () => {
  it("Should be able to create client", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "pabloykaro99@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });
    expect(response.statusCode).toBe(201);
  });
  it("Should be not able to create client existing", async () => {
    await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });
    const response = await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });
    expect(response.statusCode).toBe(409);
    expect(JSON.parse(response.body).data.type_conflict).toEqual(
      "Client already exists."
    );
  });
  it("Should be not able to create client with some fields invalids", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "pabloykaro9gmail.com",
        full_name: "Pablo",
        personal_phone: "994192707",
        personal_address: "Rua",
      },
    });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).data.status).toEqual(
      "Unable to create a client, fields invalid."
    );
  });
});
