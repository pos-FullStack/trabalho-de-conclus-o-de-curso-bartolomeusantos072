import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { usuarioAutenticado } from "@/lib/session";

// POST /api/feedbacks — RF04 (+RF05 se fotoUrl vier preenchida)
// Endpoint público: o estudante não precisa estar autenticado para avaliar.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { menuId, nota, categoriaComentario, mensagem, fotoUrl } = body;

  if (!menuId || nota === undefined || !categoriaComentario) {
    return NextResponse.json(
      { erro: "menuId, nota e categoriaComentario são obrigatórios." },
      { status: 400 }
    );
  }
  if (nota < 0 || nota > 10) {
    return NextResponse.json({ erro: "A nota deve estar entre 0 e 10." }, { status: 400 });
  }

  const feedback = await prisma.feedback.create({
    data: {
      menuId: Number(menuId),
      nota: Number(nota),
      categoriaComentario,
      mensagem: mensagem ?? null,
      fotoUrl: fotoUrl ?? null, // URL já deve vir do upload prévio ao ImgBB, feito no client
    },
  });

  return NextResponse.json(feedback, { status: 201 });
}

// GET /api/feedbacks — RF08: consolidação analítica, uso exclusivo do painel administrativo
export async function GET(req: NextRequest) {
  const usuario = await usuarioAutenticado(req);
  if (!usuario) {
    return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  }

  const feedbacks = await prisma.feedback.findMany({
    include: { menu: true },
    orderBy: { criadoEm: "desc" },
    take: 200,
  });

  return NextResponse.json(feedbacks);
}
