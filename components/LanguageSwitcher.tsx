"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/getLang";

type Props = {
  initialLang?: Lang;
  label?: string; 
};

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectLangClient(): Lang {
  const c = readCookie("arc_lang");
  if (c === "pt" || c === "en") return c;

  try {
    const ls = localStorage.getItem("arc_lang");
    if (ls === "pt" || ls === "en") return ls;
  } catch {}

  const nav = typeof navigator !== "undefined" ? (navigator.language || "").toLowerCase() : "";
  return nav.startsWith("pt") ? "pt" : "en";
}

export default function LanguageSwitcher({ initialLang = "pt", label }: Props) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>(initialLang);

  
  useEffect(() => {
    setLang(detectLangClient());
  }, []);

  function setLangCookie(next: Lang) {
    document.cookie = `arc_lang=${encodeURIComponent(next)}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`;

    try {
      localStorage.setItem("arc_lang", next);
    } catch {}

   
    window.dispatchEvent(new CustomEvent("arc:lang", { detail: next }));

    
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      {label ? <span className="hidden text-xs text-white/50 sm:inline">{label}</span> : null}

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
    </div>
  );
}
