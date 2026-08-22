"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    if (!resp.ok) {
      setErro("E-mail ou senha inválidos.");
      return;
    }
    router.push("/admin");
  }

  return (
    <main style={{ maxWidth: 360, margin: "4rem auto" }}>
      <h1>Acesso do Gestor</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
        {erro && <p style={{ color: "crimson" }}>{erro}</p>}
      </form>
    </main>
  );
}
