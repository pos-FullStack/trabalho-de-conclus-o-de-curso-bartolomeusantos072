import { NextRequest, NextResponse } from "next/server";
import { verificarToken } from "@/lib/auth";

// Protege todas as rotas /admin/* (menos /admin/login) exigindo sessão JWT válida.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  const usuario = token ? await verificarToken(token) : null;

  if (!usuario) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
