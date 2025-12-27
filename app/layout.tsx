import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { getLang } from "@/lib/getLang";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();

  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"}>
      <body className="bg-[#07080c] text-white">
        <SiteHeader />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
