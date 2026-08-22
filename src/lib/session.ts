import { NextRequest } from "next/server";
import { verificarToken, TokenPayload } from "./auth";

/**
 * Extrai e valida o usuário autenticado a partir do cookie "token".
 * Retorna null se não houver sessão válida.
 */
export async function usuarioAutenticado(req: NextRequest): Promise<TokenPayload | null> {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  return verificarToken(token);
}
