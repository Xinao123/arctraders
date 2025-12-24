import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARC Swap",
  description: "Troca de itens do ARC Raiders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
