import app from "@infra/app";
import { v4 as uuid } from "uuid";

describe("Suit test controllers company", () => {
  it("Should be able to change company", async () => {
    const createClient = await app.inject({
      method: "POST",
      url: "/clients",
      payload: {
        email: "pabloykaro99@gmail.com",
        full_name: "Pablo Ykaro Barbosa Martins",
        personal_phone: "85994192707",
        personal_address: "Rua Coronel Cícero Nogueira 399",
      },
    });
    const idClient: string = JSON.parse(createClient.body).id;
    const response = await app.inject({
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
    const idCompany: string = JSON.parse(response.body).id;
    const sut = await app.inject({
      method: "PUT",
      url: `/companies/${idCompany}`,
      payload: {
        cnpj_address: "Rua Aldenir 50",
        cnpj_phone: "85994192707",
        declared_billing: 5000.55,
      },
    });
    expect(sut.statusCode).toEqual(200);
    expect(JSON.parse(sut.body).data.type_action).toEqual("updated");
  });

  it("Should be not able to change company with client not exist", async () => {
    const sut = await app.inject({
      method: "PUT",
      url: `/companies/${uuid()}`,
      payload: {
        cnpj_address: "Rua Aldenir 50",
        cnpj_phone: "85994192707",
        declared_billing: 5000.55,
      },
    });
    expect(sut.statusCode).toBe(404);
    expect(JSON.parse(sut.body).data.status).toEqual(
      "Company not create, client not found."
    );
  });
});
