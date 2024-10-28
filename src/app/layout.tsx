import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Lista de Tarefas",
  description: "Sistema para fazer uma lista de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
