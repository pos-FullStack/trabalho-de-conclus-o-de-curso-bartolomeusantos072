import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { inferirTurno, Turno } from "@/lib/turno";

// GET /api/menus/current?shift=tarde  (shift é opcional — se omitido, infere pelo horário do servidor)
// RF01: renderiza automaticamente o cardápio da data corrente correspondente ao turno.
export async function GET(req: NextRequest) {
  const shiftParam = req.nextUrl.searchParams.get("shift");
  const turno = (shiftParam ? shiftParam.toUpperCase() : inferirTurno()) as Turno | null;

  if (!turno) {
    return NextResponse.json(
      { erro: "Fora do horário de funcionamento da cantina." },
      { status: 404 }
    );
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const menu = await prisma.menu.findFirst({
    where: { dataReferencia: hoje, turno: turno as any },
    orderBy: { criadoEm: "desc" },
  });

  if (!menu) {
    return NextResponse.json({ erro: "Cardápio não cadastrado para hoje." }, { status: 404 });
  }

  // RF03: bloco de lanche só aparece se cadastrado
  return NextResponse.json({
    turno: menu.turno,
    pratoPrincipal: menu.pratoPrincipal,
    lanche: menu.lanche ?? null,
    data: menu.dataReferencia,
  });
}
