import app from "@infra/app";

describe("Suit test controllers subscriber", () => {
  it("Should be able to create subscriber", async () => {
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
    const emailClient: string = JSON.parse(createClient.body).email;
    const sut = await app.inject({
      method: "POST",
      url: "/subscribers",
      payload: {
        email: emailClient,
        full_name: "Pablo Ykaro Barbosa Martins",
        theme_content: "finances",
      },
    });
    expect(sut.statusCode).toEqual(201);
    expect(JSON.parse(sut.body)).toHaveProperty("id");
  });

  it("Should be not able to create subscriber existing", async () => {
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
    await app.inject({
      method: "POST",
      url: "/subscribers",
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        theme_content: "finances",
      },
    });
    const sut = await app.inject({
      method: "POST",
      url: "/subscribers",
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        theme_content: "finances",
      },
    });
    expect(sut.statusCode).toBe(409);
    expect(JSON.parse(sut.body).data.type_conflict).toEqual(
      "Subscriber already exists."
    );
  });

  it("Should be not able to create subscriber with client not exist", async () => {
    const sut = await app.inject({
      method: "POST",
      url: "/subscribers",
      payload: {
        email: "pabloykaro91@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        theme_content: "finances",
      },
    });
    expect(sut.statusCode).toBe(404);
    expect(JSON.parse(sut.body).data.status).toEqual(
      "Subscriber not create, client not found."
    );
  });
});
