import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "ARC Traders",
  description: "Trocas de ARC Raiders com feed limpo e contato direto.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#07080c] text-white">
        <SiteHeader />

        {/* altura do header ~64px, então pt-20 dá folga */}
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
