import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { usuarioAutenticado } from "@/lib/session";

// GET /api/menus — lista todos os cardápios (uso do painel administrativo)
export async function GET(req: NextRequest) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  }

  const menus = await prisma.menu.findMany({
    orderBy: [{ dataReferencia: "desc" }, { turno: "asc" }],
    include: { _count: { select: { feedbacks: true } } },
  });

  return NextResponse.json(menus);
}

// POST /api/menus — RF06: cadastro de cardápio, exclusivo para gestores autenticados
export async function POST(req: NextRequest) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  }

  const body = await req.json();
  const { dataReferencia, turno, pratoPrincipal, lanche } = body;

  if (!dataReferencia || !turno || !pratoPrincipal) {
    return NextResponse.json(
      { erro: "dataReferencia, turno e pratoPrincipal são obrigatórios." },
      { status: 400 }
    );
  }

  const menu = await prisma.menu.create({
    data: {
      dataReferencia: new Date(dataReferencia),
      turno,
      pratoPrincipal,
      lanche: lanche ?? null,
      criadoPorId: Number(usuario.sub),
    },
  });

  return NextResponse.json(menu, { status: 201 });
}
