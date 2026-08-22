"use client";

import { useEffect, useState } from "react";

interface Menu {
  id: number;
  dataReferencia: string;
  turno: string;
  pratoPrincipal: string;
  lanche: string | null;
}

const TURNOS = ["MANHA", "INTEGRAL", "TARDE", "NOITE"];

export default function CardapiosAdmin() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [form, setForm] = useState({ dataReferencia: "", turno: TURNOS[0], pratoPrincipal: "", lanche: "" });

  async function carregar() {
    const resp = await fetch("/api/menus");
    setMenus(await resp.json());
  }

  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ dataReferencia: "", turno: TURNOS[0], pratoPrincipal: "", lanche: "" });
    carregar();
  }

  async function excluir(id: number) {
    await fetch(`/api/menus/${id}`, { method: "DELETE" });
    carregar();
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>Gerenciar Cardápios</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", marginBottom: "2rem" }}>
        <input type="date" value={form.dataReferencia}
          onChange={(e) => setForm({ ...form, dataReferencia: e.target.value })} required />
        <select value={form.turno} onChange={(e) => setForm({ ...form, turno: e.target.value })}>
          {TURNOS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input placeholder="Prato principal" value={form.pratoPrincipal}
          onChange={(e) => setForm({ ...form, pratoPrincipal: e.target.value })} required />
        <input placeholder="Lanche (opcional)" value={form.lanche}
          onChange={(e) => setForm({ ...form, lanche: e.target.value })} />
        <button type="submit">Cadastrar cardápio</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr><th>Data</th><th>Turno</th><th>Prato</th><th>Lanche</th><th></th></tr>
        </thead>
        <tbody>
          {menus.map((m) => (
            <tr key={m.id}>
              <td>{new Date(m.dataReferencia).toLocaleDateString("pt-BR")}</td>
              <td>{m.turno}</td>
              <td>{m.pratoPrincipal}</td>
              <td>{m.lanche ?? "—"}</td>
              <td><button onClick={() => excluir(m.id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
