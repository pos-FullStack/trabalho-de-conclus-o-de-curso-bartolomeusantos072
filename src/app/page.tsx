import MenuCard from "@/components/MenuCard";
import FeedbackForm from "@/components/FeedbackForm";
import { prisma } from "@/lib/db";
import { inferirTurno } from "@/lib/turno";

// Impede o Next.js de tentar pré-renderizar esta página em build time
// (ela consulta o banco de dados, que só existe em runtime).
export const dynamic = "force-dynamic";

// RF01/RF02: página renderizada no servidor já buscando o cardápio do turno atual.
export default async function PaginaAluno() {
  const turno = inferirTurno();

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const menu = turno
    ? await prisma.menu.findFirst({
        where: { dataReferencia: hoje, turno: turno as any },
        orderBy: { criadoEm: "desc" },
      })
    : null;

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>Cardápio Escolar</h1>

      {!turno && <p>A cantina está fora do horário de funcionamento no momento.</p>}
      {turno && !menu && <p>O cardápio de hoje ainda não foi cadastrado para este turno.</p>}
      {menu && (
        <>
          <MenuCard
            turno={menu.turno}
            pratoPrincipal={menu.pratoPrincipal}
            lanche={menu.lanche}
          />
          <h2>Deixe sua avaliação</h2>
          <FeedbackForm menuId={menu.id} />
        </>
      )}
    </main>
  );
}
