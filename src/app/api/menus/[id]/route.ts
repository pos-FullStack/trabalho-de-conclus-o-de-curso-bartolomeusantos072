import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { usuarioAutenticado } from "@/lib/session";

interface Params {
  params: { id: string };
}

// PUT /api/menus/:id — RF06: atualização de cardápio
export async function PUT(req: NextRequest, { params }: Params) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  }

  const body = await req.json();
  const menu = await prisma.menu.update({
    where: { id: Number(params.id) },
    data: {
      dataReferencia: body.dataReferencia ? new Date(body.dataReferencia) : undefined,
      turno: body.turno,
      pratoPrincipal: body.pratoPrincipal,
      lanche: body.lanche,
    },
  });

  return NextResponse.json(menu);
}

// DELETE /api/menus/:id — RF06: exclusão de cardápio
export async function DELETE(req: NextRequest, { params }: Params) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  }

  await prisma.menu.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}
