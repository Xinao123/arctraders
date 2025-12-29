import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getLang } from "@/lib/getLang";
import { i18n } from "@/lib/i18n";

export const revalidate = 30;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-2xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs text-white/60">{label}</div>
      {hint ? <div className="mt-2 text-[11px] text-white/45">{hint}</div> : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-white/70">{subtitle}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

function ListingCard({
  listing,
  t,
}: {
  listing: {
    id: string;
    imageUrl: string;
    offerText: string;
    wantText: string;
    region: string | null;
    createdAt: Date;
    user: {
      displayName: string | null;
      steamProfileUrl: string | null;
      discordHandle: string | null;
    };
    tags: { tagId: string; tag: { name: string } }[];
  };
  t: {
    cardOffer: string;
    cardWant: string;
    discordAvailable: string;
    noContact: string;
    imageAlt: string;
  };
}) {
  const steam = listing.user?.steamProfileUrl ?? null;
  const discord = listing.user?.discordHandle ?? null;

  return (
    <article className="group rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]">
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="relative h-[220px] w-full">
          {/* fundo “ambient” pra matar borda preta */}
          <Image
            src={listing.imageUrl}
            alt=""
            aria-hidden
            fill
            className="object-cover scale-110 blur-2xl opacity-35"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={95}
          />

          {/* gradiente por cima pra ficar mais “premium” */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />

          {/* imagem principal com padding (não encosta nas bordas) */}
          <div className="absolute inset-0 p-3">
            <div className="relative h-full w-full">
              <Image
                src={listing.imageUrl}
                alt={t.imageAlt}
                fill
                className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={95}
              />
            </div>
          </div>

          {/* ring suave */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
        </div>
      </div>

      {/* Text */}
      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wide text-white/45">
              {t.cardOffer}
            </div>
            <div className="mt-1 line-clamp-2 text-sm font-semibold text-white">
              {listing.offerText}
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/65">
            {listing.region ?? "—"}
          </span>
        </div>

        <div className="mt-3 text-[11px] uppercase tracking-wide text-white/45">
          {t.cardWant}
        </div>
        <div className="mt-1 line-clamp-2 text-sm text-white/80">{listing.wantText}</div>

        {/* Tags */}
        {listing.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.tags.slice(0, 6).map((x) => (
              <Pill key={x.tagId}>{x.tag.name}</Pill>
            ))}
          </div>
        ) : null}

        {/* Contacts */}
        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
          <div className="truncate text-white/45">
            {/* espaço pra você colocar depois “há X min” se quiser */}
          </div>

          <div className="flex items-center gap-2">
            {steam ? (
              <a
                href={steam}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                title="Steam"
              >
                <span className="text-[13px]">🎮</span>
                Steam
              </a>
            ) : null}

            {discord ? (
              <span
                className="inline-flex max-w-[170px] items-center gap-2 truncate rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/75"
                title={discord}
              >
                <span className="text-[13px]">💬</span>
                <span className="truncate">{discord}</span>
              </span>
            ) : null}

            {!steam && !discord ? (
              <span className="text-white/35">{t.noContact}</span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const lang = await getLang();
  const t = i18n[lang];

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [totalListings, activeListings, listingsLast24h, latestListings, topTagCounts] =
    await Promise.all([
      prisma.listing.count(),
      prisma.listing.count({ where: { status: "ACTIVE" } }),
      prisma.listing.count({ where: { status: "ACTIVE", createdAt: { gte: since24h } } }),
      prisma.listing.findMany({
        where: { status: "ACTIVE" },
        take: 6,
        orderBy: { createdAt: "desc" },
        include: { user: true, tags: { include: { tag: true } } },
      }),
      prisma.listingTag.groupBy({
        by: ["tagId"],
        _count: { tagId: true },
        orderBy: { _count: { tagId: "desc" } },
        take: 10,
      }),
    ]);

  const tags = topTagCounts.length
    ? await prisma.tag.findMany({
        where: { id: { in: topTagCounts.map((x) => x.tagId) } },
      })
    : [];

  const tagMap = new Map(tags.map((x) => [x.id, x.name]));
  const topTags = topTagCounts
    .map((x) => ({
      id: x.tagId,
      name: tagMap.get(x.tagId) ?? "tag",
      count: x._count.tagId,
    }))
    .filter((x) => x.name !== "tag");

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge>{t.badge}</Badge>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {t.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/70">{t.subtitle}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                {t.postNow}
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {t.openFeed}
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <Stat label={t.total} value={String(totalListings)} hint={t.totalHint} />
              <Stat label={t.new24h} value={String(listingsLast24h)} hint={t.new24hHint} />
              <Stat label={t.activeNow} value={String(activeListings)} hint={t.activeNowHint} />
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur">
              <div className="font-semibold text-white">{t.rulesTitle}</div>
              <ul className="mt-3 space-y-2">
                <li>✅ {t.rules1}</li>
                <li>✅ {t.rules2}</li>
                <li>✅ {t.rules3}</li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-xs text-white/50">{t.trendingTitle}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {topTags.length ? (
                  topTags.map((x) => (
                    <Pill key={x.id}>
                      {x.name} <span className="text-white/40">({x.count})</span>
                    </Pill>
                  ))
                ) : (
                  <>
                    <Pill>{t.noTags1}</Pill>
                    <Pill>{t.noTags2}</Pill>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{t.previewTitle}</div>
                <div className="text-xs text-white/60">{t.previewSubtitle}</div>
              </div>
              <div className="text-xs text-white/50">
                {t.previewNewPrefix}
                {listingsLast24h}
                {t.previewNewSuffix}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {latestListings.slice(0, 4).map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l as any}
                  t={{
                    cardOffer: t.cardOffer,
                    cardWant: t.cardWant,
                    discordAvailable: t.discordAvailable,
                    noContact: t.noContact,
                    imageAlt: t.imageAlt,
                  }}
                />
              ))}
            </div>

            {latestListings.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/70">
                {t.emptyPreview}
              </div>
            ) : null}

            <div className="mt-4 flex justify-end">
              <Link
                href="/listings"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                {t.viewAll}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionTitle
          title={t.howTitle}
          subtitle={t.howSubtitle}
          right={
            <Link
              href="/new"
              className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:inline-flex"
            >
              {t.howCta}
            </Link>
          }
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg">🖼️</div>
            <div className="mt-3 text-base font-semibold">{t.step1Title}</div>
            <div className="mt-2 text-sm text-white/70">{t.step1Desc}</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg">🏷️</div>
            <div className="mt-3 text-base font-semibold">{t.step2Title}</div>
            <div className="mt-2 text-sm text-white/70">{t.step2Desc}</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg">🤝</div>
            <div className="mt-3 text-base font-semibold">{t.step3Title}</div>
            <div className="mt-2 text-sm text-white/70">{t.step3Desc}</div>
          </div>
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          {t.footer}
        </footer>
      </section>
    </main>
  );
}
