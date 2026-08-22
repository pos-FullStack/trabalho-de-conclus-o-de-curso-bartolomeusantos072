import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verificarSenha, gerarToken } from "@/lib/auth";

// POST /api/auth/login — RF07
export async function POST(req: NextRequest) {
  const { email, senha } = await req.json();

  if (!email || !senha) {
    return NextResponse.json({ erro: "E-mail e senha são obrigatórios." }, { status: 400 });
  }

  const usuario = await prisma.user.findUnique({ where: { email } });
  if (!usuario) {
    return NextResponse.json({ erro: "Credenciais inválidas." }, { status: 401 });
  }

  const senhaValida = await verificarSenha(senha, usuario.senhaHash);
  if (!senhaValida) {
    return NextResponse.json({ erro: "Credenciais inválidas." }, { status: 401 });
  }

  const token = await gerarToken({
    sub: String(usuario.id),
    papel: usuario.papel,
    nome: usuario.nome,
  });

  const resposta = NextResponse.json({ nome: usuario.nome, papel: usuario.papel });
  resposta.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8h
    path: "/",
  });
  return resposta;
}
