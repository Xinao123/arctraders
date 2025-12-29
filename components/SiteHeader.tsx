import Link from "next/link";
import { getLang } from "@/lib/getLang";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const copy = {
  pt: {
    home: "Início",
    feed: "Feed",
    faq: "FAQ",
    post: "Postar troca",
    feedback: "Feedback",
    lang: "Idioma",
    menu: "Menu",
  },
  en: {
    home: "Home",
    feed: "Feed",
    faq: "FAQ",
    post: "Post trade",
    feedback: "Feedback",
    lang: "Language",
    menu: "Menu",
  },
} as const;

export default async function SiteHeader() {
  const lang = await getLang();
  const t = copy[lang];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07080c]/75 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
              ⚡
            </span>
            <span className="font-semibold tracking-tight">ARC Traders</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              {t.home}
            </Link>
            <Link
              href="/listings"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              {t.feed}
            </Link>
            <Link
              href="/faq"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              {t.faq}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/feedback"
              className="hidden sm:inline-flex rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t.feedback}
            </Link>

            <LanguageSwitcher initialLang={lang} label={t.lang} />

            <Link
              href="/new"
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              {t.post}
            </Link>

            {/* Mobile menu (sem JS) */}
            <details className="relative md:hidden">
              <summary className="list-none cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                {t.menu}
              </summary>

              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b10]/95 p-1 shadow-2xl backdrop-blur">
                <Link
                  href="/"
                  className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {t.home}
                </Link>
                <Link
                  href="/listings"
                  className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {t.feed}
                </Link>
                <Link
                  href="/faq"
                  className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {t.faq}
                </Link>
                <Link
                  href="/feedback"
                  className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {t.feedback}
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
