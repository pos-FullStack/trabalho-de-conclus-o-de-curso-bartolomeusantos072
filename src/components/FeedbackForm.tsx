"use client";

import { useState } from "react";

interface FeedbackFormProps {
  menuId: number;
}

const CATEGORIAS = ["Sabor", "Temperatura", "Quantidade", "Higiene", "Sugestão"];

export default function FeedbackForm({ menuId }: FeedbackFormProps) {
  const [nota, setNota] = useState(8);
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [mensagem, setMensagem] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "erro">("idle");

  async function enviarFoto(): Promise<string | null> {
    if (!foto) return null;
    // RF05: upload assíncrono para provedor em nuvem (ImgBB), URL persistida no feedback
    const formData = new FormData();
    formData.append("image", foto);
    const resp = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await resp.json();
    return data?.data?.url ?? null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setStatus("idle");
    try {
      const fotoUrl = await enviarFoto();
      const resp = await fetch("/api/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuId, nota, categoriaComentario: categoria, mensagem, fotoUrl }),
      });
      if (!resp.ok) throw new Error();
      setStatus("ok");
      setMensagem("");
      setFoto(null);
    } catch {
      setStatus("erro");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <label>
        Nota (0 a 10)
        <input
          type="number" min={0} max={10} value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
          required
        />
      </label>

      <label>
        Categoria
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label>
        Comentário
        <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} rows={3} />
      </label>

      <label>
        Foto do prato (opcional)
        <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files?.[0] ?? null)} />
      </label>

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar avaliação"}
      </button>

      {status === "ok" && <p style={{ color: "green" }}>Avaliação enviada. Obrigado!</p>}
      {status === "erro" && <p style={{ color: "crimson" }}>Não foi possível enviar. Tente novamente.</p>}
    </form>
  );
}
