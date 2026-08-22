export const metadata = {
  title: "Cardápio Escolar",
  description: "Sistema de gestão e avaliação de cardápio escolar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
