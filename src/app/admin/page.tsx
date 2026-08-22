import { prisma } from "@/lib/db";
import Link from "next/link";

// Impede o Next.js de tentar pré-renderizar esta página em build time
// (ela consulta o banco de dados, que só existe em runtime).
export const dynamic = "force-dynamic";

export default async function DashboardAdmin() {
  const totalFeedbacks = await prisma.feedback.count();
  const mediaNotaResult = await prisma.feedback.aggregate({ _avg: { nota: true } });
  const totalCardapios = await prisma.menu.count();

  const mediaNota = mediaNotaResult._avg.nota;

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>Painel de Gestão</h1>

      <section style={{ display: "flex", gap: "1.5rem", margin: "1.5rem 0" }}>
        <Metric titulo="Cardápios cadastrados" valor={totalCardapios} />
        <Metric titulo="Avaliações recebidas" valor={totalFeedbacks} />
        <Metric titulo="Nota média" valor={mediaNota ? mediaNota.toFixed(1) : "—"} />
      </section>

      <nav>
        <Link href="/admin/cardapios">Gerenciar cardápios →</Link>
      </nav>
    </main>
  );
}

function Metric({ titulo, valor }: { titulo: string; valor: string | number }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem", flex: 1, textAlign: "center" }}>
      <p style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>{valor}</p>
      <p style={{ color: "#666", margin: 0 }}>{titulo}</p>
    </div>
  );
}
