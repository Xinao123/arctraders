"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/getLang";
import { i18n } from "@/lib/i18n";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectClientLang(): Lang {
  const c = readCookie("arc_lang");
  if (c === "pt" || c === "en") return c;

  try {
    const ls = localStorage.getItem("arc_lang");
    if (ls === "pt" || ls === "en") return ls;
  } catch {}

  if (typeof navigator !== "undefined") {
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("pt")) return "pt";
  }
  return "en";
}

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, json: JSON.parse(text), raw: text };
  } catch {
    return { ok: res.ok, status: res.status, json: null as any, raw: text };
  }
}

export default function FeedbackPage() {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    setLang(detectClientLang());
  }, []);

  useEffect(() => {
    const onEvent = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      if (next === "pt" || next === "en") setLang(next);
      else setLang(detectClientLang());
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === "arc_lang" && (e.newValue === "pt" || e.newValue === "en")) {
        setLang(e.newValue);
      }
    };

    window.addEventListener("arc:lang", onEvent as any);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("arc:lang", onEvent as any);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const tAll = i18n[lang];
  const t = tAll.feedback;

  const [kind, setKind] = useState<"suggestion" | "bug">("suggestion");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-bot simples

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentOk, setSentOk] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location?.href ?? "");
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSentOk(false);

    // anti-bot: se preencher campo escondido, a gente ignora
    if (honeypot.trim()) {
      setSentOk(true);
      return;
    }

    const cleanMsg = message.trim();
    const cleanContact = contact.trim();
    const cleanUrl = pageUrl.trim();

    if (cleanMsg.length < 10) {
      setError(t.errMessageShort);
      return;
    }
    if (cleanMsg.length > 2000) {
      setError(t.errMessageLong);
      return;
    }
    if (cleanContact.length > 200) {
      setError(t.errContactLong);
      return;
    }
    if (cleanUrl.length > 500) {
      setError(t.errUrlLong);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          message: cleanMsg,
          contact: cleanContact || null,
          pageUrl: cleanUrl || null,
          lang,
        }),
      });

      const out = await safeJson(res);
      if (!out.ok) {
        throw new Error(out.json?.error ?? `${t.errSendFail} (${out.status})`);
      }

      setSentOk(true);
      setMessage("");
      setContact("");
    } catch (err: any) {
      setError(err?.message ?? t.errTryAgain);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>{t.badge}</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.title}</h1>
            <p className="mt-2 text-sm text-white/70">{t.subtitle}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t.backHome}
            </Link>
            <Link
              href="/listings"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              {t.backFeed}
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">
            {error}
          </div>
        )}

        {sentOk && (
          <div className="mt-6 rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-50">
            <div className="font-semibold">{t.successTitle}</div>
            <div className="mt-1 text-emerald-50/80">{t.successBody}</div>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
        >
          <div className="grid gap-4">
            {/* Honeypot */}
            <input
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="text-xs font-semibold text-white/70">{t.kindLabel}</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as any)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white"
              >
                <option value="suggestion">{t.kindSuggestion}</option>
                <option value="bug">{t.kindBug}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70">{t.messageLabel}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePh}
                rows={7}
                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
              />
              <div className="mt-2 text-xs text-white/45">{t.messageHint}</div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70">{t.contactLabel}</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t.contactPh}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
              />
              <div className="mt-2 text-xs text-white/45">{t.contactHint}</div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70">{t.pageLabel}</label>
              <input
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                placeholder={t.pagePh}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
            >
              {sending ? t.sending : t.send}
            </button>

            <div className="text-center text-xs text-white/45">{t.footer}</div>
          </div>
        </form>
      </div>
    </main>
  );
}
