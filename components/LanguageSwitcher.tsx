"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/getLang";

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectLangClient(): Lang {
  const c = readCookie("arc_lang");
  if (c === "pt" || c === "en") return c;

  const ls = typeof window !== "undefined" ? window.localStorage.getItem("arc_lang") : null;
  if (ls === "pt" || ls === "en") return ls;

  const nav = typeof navigator !== "undefined" ? (navigator.language || "").toLowerCase() : "";
  return nav.startsWith("pt") ? "pt" : "en";
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    setLang(detectLangClient());
  }, []);

  function setLangCookie(next: Lang) {
    // 1) cookie (30 dias)
    document.cookie = `arc_lang=${encodeURIComponent(next)}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`;

    // 2) localStorage (pra disparar storage event em outras abas e pra leitura rápida)
    try {
      localStorage.setItem("arc_lang", next);
    } catch {}

    // 3) evento pro app reagir sem refresh manual
    window.dispatchEvent(new CustomEvent("arc:lang", { detail: next }));

    // 4) atualiza server components (home/listings/etc) sem recarregar a página inteira
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
      <button
        type="button"
        onClick={() => {
          setLang("pt");
          setLangCookie("pt");
        }}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
          lang === "pt" ? "bg-white text-black" : "text-white/70 hover:bg-white/10"
        }`}
      >
        PT-BR
      </button>

      <button
        type="button"
        onClick={() => {
          setLang("en");
          setLangCookie("en");
        }}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
          lang === "en" ? "bg-white text-black" : "text-white/70 hover:bg-white/10"
        }`}
      >
        EN
      </button>
    </div>
  );
}
