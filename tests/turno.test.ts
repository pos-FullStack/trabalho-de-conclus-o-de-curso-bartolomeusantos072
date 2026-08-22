import { inferirTurno } from "../src/lib/turno";

describe("inferirTurno", () => {
  test("09:00 deve ser MANHA", () => {
    expect(inferirTurno(new Date(2026, 0, 1, 9, 0))).toBe("MANHA");
  });

  test("09:30 (limite) deve ser MANHA", () => {
    expect(inferirTurno(new Date(2026, 0, 1, 9, 30))).toBe("MANHA");
  });

  test("09:31 deve ser INTEGRAL", () => {
    expect(inferirTurno(new Date(2026, 0, 1, 9, 31))).toBe("INTEGRAL");
  });

  test("12:00 deve ser INTEGRAL", () => {
    expect(inferirTurno(new Date(2026, 0, 1, 12, 0))).toBe("INTEGRAL");
  });

  test("13:00 deve ser TARDE", () => {
    expect(inferirTurno(new Date(2026, 0, 1, 13, 0))).toBe("TARDE");
  });

  test("19:00 deve ser NOITE", () => {
    expect(inferirTurno(new Date(2026, 0, 1, 19, 0))).toBe("NOITE");
  });

  test("22:00 (fora do expediente) deve ser null", () => {
    expect(inferirTurno(new Date(2026, 0, 1, 22, 0))).toBeNull();
  });
});
