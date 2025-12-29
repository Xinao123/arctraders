"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/getLang";

type Props = {
  initialLang: Lang;
  label?: string; // vamos ignorar visualmente e manter acessível
};

function setLangEverywhere(next: Lang) {
  // cookie (1 ano)
  document.cookie = `arc_lang=${encodeURIComponent(next)}; path=/; max-age=31536000; samesite=lax`;

  // localStorage
  try {
    localStorage.setItem("arc_lang", next);
  } catch {}

  // avisa o app (você já usa isso nas pages)
  window.dispatchEvent(new CustomEvent("arc:lang", { detail: next }));
}

export default function LanguageSwitcher({ initialLang, label }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  const isPT = lang === "pt";

  return (
    <div className="flex items-center gap-2">
      {/* acessibilidade sem comer layout */}
      <span className="sr-only">{label ?? "Language"}</span>

      <div className="inline-flex h-9 items-center rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur">
        <button
          type="button"
          onClick={() => {
            setLang("pt");
            setLangEverywhere("pt");
          }}
          className={`h-7 rounded-lg px-2.5 text-xs font-semibold transition ${
            isPT
              ? "bg-white text-black"
              : "text-white/75 hover:bg-white/10 hover:text-white"
          }`}
          aria-pressed={isPT}
        >
          PT
        </button>

        <button
          type="button"
          onClick={() => {
            setLang("en");
            setLangEverywhere("en");
          }}
          className={`h-7 rounded-lg px-2.5 text-xs font-semibold transition ${
            !isPT
              ? "bg-white text-black"
              : "text-white/75 hover:bg-white/10 hover:text-white"
          }`}
          aria-pressed={!isPT}
        >
          EN
        </button>
      </div>
    </div>
  );
}
