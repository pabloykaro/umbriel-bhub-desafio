import app from "@infra/app";

describe("Suit test controllers subscriber", () => {
  it("Should be able to find subscriber per id subscriber", async () => {
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
    const createSubscriber = await app.inject({
      method: "POST",
      url: "/subscribers",
      payload: {
        email: "pabloykaro9@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        theme_content: "finances",
      },
    });
    const idSubscriber = JSON.parse(createSubscriber.body).id;
    const sut = await app.inject({
      method: "GET",
      url: `/subscribers/${idSubscriber}`,
    });
    expect(sut.statusCode).toEqual(200);
    expect(JSON.parse(sut.body)).toHaveProperty("id");
  });
});
