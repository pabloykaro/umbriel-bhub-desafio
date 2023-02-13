import app from "@infra/app";

describe("Suit test controllers subscriber", () => {
  it("Should be able to delete subscriber", async () => {
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
      method: "DELETE",
      url: "/subscribers",
      payload: {
        email: "pabloykaro9@gmail.com",
        theme_content: "finances",
      },
    });
    expect(sut.statusCode).toEqual(200);
    expect(JSON.parse(sut.body).data.type_action).toEqual("deleted");
  });

  it("Should be not able to delete subscriber with client not exist", async () => {
    const sut = await app.inject({
      method: "DELETE",
      url: "/subscribers",
      payload: {
        email: "pabloykarow91@gmail.com",
        theme_content: "finances",
      },
    });
    expect(sut.statusCode).toBe(404);
    expect(JSON.parse(sut.body).data.status).toEqual(
      "Subscriber not delete, client not found."
    );
  });
});
