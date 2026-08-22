// Exemplo de teste de integração com Supertest para o endpoint POST /api/feedbacks.
// Assume um servidor de teste apontando para uma base de dados isolada (ex.: banco
// de testes via docker-compose.test.yml) — ajustar BASE_URL conforme o ambiente de CI.

import request from "supertest";

const BASE_URL = process.env.TEST_BASE_URL ?? "http://localhost:3000";

describe("POST /api/feedbacks", () => {
  test("rejeita nota fora do intervalo 0-10", async () => {
    const resp = await request(BASE_URL).post("/api/feedbacks").send({
      menuId: 1,
      nota: 15,
      categoriaComentario: "Sabor",
    });
    expect(resp.status).toBe(400);
  });

  test("rejeita payload sem categoriaComentario", async () => {
    const resp = await request(BASE_URL).post("/api/feedbacks").send({
      menuId: 1,
      nota: 8,
    });
    expect(resp.status).toBe(400);
  });
});
