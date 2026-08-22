// Regra de negócio pura (sem dependências externas) — facilita o teste unitário
// exigido em RNF05. Faixas conforme RF02 do TCC.

export type Turno = "MANHA" | "INTEGRAL" | "TARDE" | "NOITE";

/**
 * Infere o turno letivo a partir de um horário local.
 * Faixas: Manhã até 9h30 | Integral 9h31–12h00 | Tarde 12h01–14h00 | Noturno 14h01–20h15
 */
export function inferirTurno(data: Date = new Date()): Turno | null {
  const minutos = data.getHours() * 60 + data.getMinutes();

  const MANHA_FIM = 9 * 60 + 30;      // 09:30
  const INTEGRAL_FIM = 12 * 60;       // 12:00
  const TARDE_FIM = 14 * 60;          // 14:00
  const NOITE_FIM = 20 * 60 + 15;     // 20:15

  if (minutos <= MANHA_FIM) return "MANHA";
  if (minutos <= INTEGRAL_FIM) return "INTEGRAL";
  if (minutos <= TARDE_FIM) return "TARDE";
  if (minutos <= NOITE_FIM) return "NOITE";
  return null; // fora do horário de funcionamento
}
