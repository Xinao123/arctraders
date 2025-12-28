import Link from "next/link";
import { getLang } from "@/lib/getLang";
import { i18n } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function FAQItem({
  q,
  children,
  defaultOpen,
  openLabel,
  closeLabel,
}: {
  q: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <details
      className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-white/20"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white">
        <span>{q}</span>
        <span className="shrink-0 rounded-xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70 group-open:bg-white/10">
          <span className="group-open:hidden">{openLabel}</span>
          <span className="hidden group-open:inline">{closeLabel}</span>
        </span>
      </summary>

      <div className="mt-3 text-sm leading-relaxed text-white/70">{children}</div>
    </details>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-white/70">{subtitle}</p> : null}
    </div>
  );
}

export async function generateMetadata() {
  const lang = await getLang();
  const t = i18n[lang].faq;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function FAQPage() {
  const lang = await getLang();
  const t = i18n[lang].faq;

  return (
    <main className="min-h-screen bg-[#07080c] pt-20 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Badge>🧩 {t.badge}</Badge>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
            <p className="mt-2 text-sm text-white/70">{t.subtitle}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/new"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              {t.ctaPost}
            </Link>
            <Link
              href="/listings"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t.ctaFeed}
            </Link>
          </div>
        </div>

   
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <section id="geral" className="space-y-4">
              <SectionTitle title={t.generalTitle} subtitle={t.generalSubtitle} />
              <div className="space-y-3">
                <FAQItem q={t.g1q} defaultOpen openLabel={t.open} closeLabel={t.close}>
                  {t.g1a}
                </FAQItem>
                <FAQItem q={t.g2q} openLabel={t.open} closeLabel={t.close}>
                  {t.g2a}
                </FAQItem>
                <FAQItem q={t.g3q} openLabel={t.open} closeLabel={t.close}>
                  {t.g3a}
                </FAQItem>
              </div>
            </section>

            <section id="postar" className="space-y-4">
              <SectionTitle title={t.postingTitle} subtitle={t.postingSubtitle} />
              <div className="space-y-3">
                <FAQItem q={t.p1q} openLabel={t.open} closeLabel={t.close}>
                  {t.p1a}
                </FAQItem>
                <FAQItem q={t.p2q} openLabel={t.open} closeLabel={t.close}>
                  {t.p2a}
                </FAQItem>
                <FAQItem q={t.p3q} openLabel={t.open} closeLabel={t.close}>
                  {t.p3a}
                </FAQItem>
                <FAQItem q={t.p4q} openLabel={t.open} closeLabel={t.close}>
                  {t.p4a}
                </FAQItem>
              </div>
            </section>

            <section id="expiracao" className="space-y-4">
              <SectionTitle title={t.expirationTitle} subtitle={t.expirationSubtitle} />
              <div className="space-y-3">
                <FAQItem q={t.e1q} openLabel={t.open} closeLabel={t.close}>
                  {t.e1a}
                </FAQItem>
                <FAQItem q={t.e2q} openLabel={t.open} closeLabel={t.close}>
                  {t.e2a}
                </FAQItem>
              </div>
            </section>

            <section id="seguranca" className="space-y-4">
              <SectionTitle title={t.safetyTitle} />
              <div className="space-y-3">
                <FAQItem q={t.s1q} openLabel={t.open} closeLabel={t.close}>
                  {t.s1a}
                </FAQItem>
                <FAQItem q={t.s2q} openLabel={t.open} closeLabel={t.close}>
                  {t.s2a}
                </FAQItem>
                <FAQItem q={t.s3q} openLabel={t.open} closeLabel={t.close}>
                  {t.s3a}
                </FAQItem>
              </div>
            </section>

            <section id="privacidade" className="space-y-4">
              <SectionTitle title={t.privacyTitle} subtitle={t.privacySubtitle} />
              <div className="space-y-3">
                <FAQItem q={t.pr1q} openLabel={t.open} closeLabel={t.close}>
                  {t.pr1a}
                </FAQItem>
                <FAQItem q={t.pr2q} openLabel={t.open} closeLabel={t.close}>
                  {t.pr2a}
                </FAQItem>
              </div>
            </section>

            <section id="problemas" className="space-y-4">
              <SectionTitle title={t.issuesTitle} subtitle={t.issuesSubtitle} />
              <div className="space-y-3">
                <FAQItem q={t.i1q} openLabel={t.open} closeLabel={t.close}>
                  {t.i1a}
                </FAQItem>
                <FAQItem q={t.i2q} openLabel={t.open} closeLabel={t.close}>
                  {t.i2a}
                </FAQItem>
              </div>
            </section>
          </div>


          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-sm font-semibold">{t.shortcutsTitle}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="#geral"
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
                >
                  {t.shGeneral}
                </a>
                <a
                  href="#postar"
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
                >
                  {t.shPosting}
                </a>
                <a
                  href="#expiracao"
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
                >
                  {t.shExpiration}
                </a>
                <a
                  href="#seguranca"
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
                >
                  {t.shSafety}
                </a>
                <a
                  href="#privacidade"
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
                >
                  {t.shPrivacy}
                </a>
                <a
                  href="#problemas"
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
                >
                  {t.shIssues}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur">
              <div className="font-semibold text-white">{t.tipTitle}</div>
              <p className="mt-2">{t.tipBody}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-xs text-white/55 backdrop-blur">
              {t.footer}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
