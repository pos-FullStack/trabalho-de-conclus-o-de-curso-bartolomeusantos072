interface MenuCardProps {
  turno: string;
  pratoPrincipal: string;
  lanche?: string | null;
}

const NOMES_TURNO: Record<string, string> = {
  MANHA: "Manhã",
  INTEGRAL: "Integral",
  TARDE: "Tarde",
  NOITE: "Noite",
};

export default function MenuCard({ turno, pratoPrincipal, lanche }: MenuCardProps) {
  return (
    <section style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem", margin: "1rem 0" }}>
      <p style={{ fontWeight: 600, color: "#555" }}>Turno: {NOMES_TURNO[turno] ?? turno}</p>
      <p><strong>Prato principal:</strong> {pratoPrincipal}</p>
      {/* RF03: bloco de lanche só é renderizado quando cadastrado */}
      {lanche && <p><strong>Lanche:</strong> {lanche}</p>}
    </section>
  );
}
