import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getLang } from "@/lib/getLang";
import { i18n } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

type SearchParams = Record<string, string | string[] | undefined>;
type PageProps = { searchParams?: SearchParams | Promise<SearchParams> };

function firstParam(sp: SearchParams, key: string, fallback = "") {
  const v = sp?.[key];
  if (Array.isArray(v)) return (v[0] ?? fallback).toString();
  return (v ?? fallback).toString();
}

function formatDate(d: Date, lang: "pt" | "en") {
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

function timeLeft(expiresAt: Date, now: Date, t: any) {
  const ms = expiresAt.getTime() - now.getTime();
  if (ms <= 0) return t.expiresExpired;

  const min = Math.floor(ms / 60000);
  const h = Math.floor(min / 60);
  const d = Math.floor(h / 24);

  if (d >= 2) return `${t.expiresIn} ${d} ${t.days}`;
  if (d === 1) return `${t.expiresIn} 1 ${t.day}`;
  if (h >= 2) return `${t.expiresIn} ${h}${t.hourShort}`;
  if (h === 1) return `${t.expiresIn} 1${t.hourShort}`;
  if (min >= 2) return `${t.expiresIn} ${min}${t.minuteShort}`;
  return `${t.expiresIn} ${t.moments}`;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function buildHref(
  base: { q: string; region: string; sort: string; tag: string },
  patch: Partial<typeof base>
) {
  const next = { ...base, ...patch };
  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.region) params.set("region", next.region);
  if (next.sort) params.set("sort", next.sort);
  if (next.tag) params.set("tag", next.tag);
  const qs = params.toString();
  return qs ? `/listings?${qs}` : "/listings";
}

function isLongText(text: string, limit = 90) {
  return (text ?? "").trim().length > limit;
}

function ExpandableText({
  text,
  moreLabel,
  lessLabel,
  clampClass = "line-clamp-2",
  className = "",
}: {
  text: string;
  moreLabel: string;
  lessLabel: string;
  clampClass?: string;
  className?: string;
}) {
  const content = (text ?? "").trim();
  if (!content) return null;

  if (!isLongText(content)) {
    return <div className={`break-words ${className}`}>{content}</div>;
  }

  return (
    <details className="group">
      <summary className="cursor-pointer list-none select-none">
        <div className={`break-words ${className}`}>
          <span className={`block group-open:hidden ${clampClass}`}>{content}</span>
          <span className="hidden group-open:block whitespace-pre-wrap">{content}</span>
        </div>

        <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/55 group-open:hidden">
          {moreLabel} <span aria-hidden>▾</span>
        </span>
        <span className="mt-1 hidden items-center gap-1 text-[11px] text-white/55 group-open:inline-flex">
          {lessLabel} <span aria-hidden>▴</span>
        </span>
      </summary>
    </details>
  );
}

export default async function ListingsPage({ searchParams }: PageProps) {
  noStore();

  const lang = await getLang();
  const t = i18n[lang].listings;

  const sp: SearchParams = (await Promise.resolve(searchParams)) ?? {};
  const now = new Date();

  const q = firstParam(sp, "q", "").trim();
  const region = firstParam(sp, "region", "").trim();
  const tag = firstParam(sp, "tag", "").trim();
  const sort = firstParam(sp, "sort", "new").trim();

  const base = { q, region, sort, tag };

  let listings: any[] = [];
  let dbError: string | null = null;
  let regions: string[] = [];
  let topTags: { name: string; count: number }[] = [];
  let totalMatched = 0;

  try {
    await prisma.listing.deleteMany({
      where: { expiresAt: { lte: now } },
    });

    const where: any = {
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    };

    if (region) {
      where.region = { contains: region, mode: "insensitive" };
    }

    if (tag) {
      where.tags = {
        some: {
          tag: { name: { equals: tag, mode: "insensitive" } },
        },
      };
    }

    if (q) {
      where.AND = where.AND ?? [];
      where.AND.push({
        OR: [
          { offerText: { contains: q, mode: "insensitive" } },
          { wantText: { contains: q, mode: "insensitive" } },
          { availabilityNote: { contains: q, mode: "insensitive" } },
          { region: { contains: q, mode: "insensitive" } },
          {
            tags: {
              some: {
                tag: { name: { contains: q, mode: "insensitive" } },
              },
            },
          },
        ],
      });
    }

    const orderBy: Prisma.ListingOrderByWithRelationInput[] =
      sort === "expiring"
        ? [{ expiresAt: "asc" }, { createdAt: "desc" }]
        : [{ createdAt: "desc" }];

    const [rows, total, regionRows, tagCounts] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        take: 30,
        include: {
          user: true,
          tags: { include: { tag: true } },
        },
      }),
      prisma.listing.count({ where }),
      prisma.listing.findMany({
        where: { OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] },
        select: { region: true },
        distinct: ["region"],
        take: 80,
      }),
      prisma.listingTag.groupBy({
        by: ["tagId"],
        _count: { tagId: true },
        orderBy: { _count: { tagId: "desc" } },
        take: 12,
      }),
    ]);

    listings = rows;
    totalMatched = total;

    regions = (regionRows ?? [])
      .map((r) => (r.region ?? "").trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, lang === "pt" ? "pt-BR" : "en"));

    const tags = tagCounts.length
      ? await prisma.tag.findMany({
          where: { id: { in: tagCounts.map((x) => x.tagId) } },
          select: { id: true, name: true },
        })
      : [];

    const tagMap = new Map(tags.map((x) => [x.id, x.name]));
    topTags = tagCounts
      .map((x) => ({
        name: tagMap.get(x.tagId) ?? "",
        count: x._count.tagId,
      }))
      .filter((x) => x.name);
  } catch (e: any) {
    dbError = e?.message ?? "DB error.";
  }

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>{t.badge}</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t.title}</h1>
            <p className="mt-2 text-sm text-white/70">{t.subtitle}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/new"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              {t.create}
            </Link>
            <Link
              href="/listings"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t.clear}
            </Link>
          </div>
        </div>

        <form
          method="GET"
          className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-white/70">{t.searchLabel}</label>
              <input
                name="q"
                defaultValue={q}
                placeholder={t.searchPh}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70">{t.regionLabel}</label>
              <select
                name="region"
                defaultValue={region}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white"
              >
                <option value="">{t.regionAll}</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70">{t.sortLabel}</label>
              <select
                name="sort"
                defaultValue={sort}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white"
              >
                <option value="new">{t.sortNew}</option>
                <option value="expiring">{t.sortExpiring}</option>
              </select>
            </div>
          </div>

          <input type="hidden" name="tag" value={tag} />

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-xs text-white/50">
              {t.showingPrefix} <span className="text-white/80">30</span> {t.showingMid}{" "}
              <span className="text-white/80">{totalMatched}</span> {t.showingSuffix}
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              {t.apply}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/50">{t.popularTags}</span>

            <Link
              href={buildHref(base, { tag: "" })}
              className={`rounded-full border px-3 py-1 text-xs ${
                !tag
                  ? "border-white/25 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {t.allTags}
            </Link>

            {topTags.slice(0, 10).map((x) => (
              <Link
                key={x.name}
                href={buildHref(base, { tag: x.name })}
                className={`rounded-full border px-3 py-1 text-xs ${
                  tag.toLowerCase() === x.name.toLowerCase()
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {x.name} <span className="text-white/40">({x.count})</span>
              </Link>
            ))}
          </div>
        </form>

        {dbError && (
          <div className="mt-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-100">
            {dbError}
          </div>
        )}

        {!dbError && listings.length === 0 && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            {t.emptyFilters}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => {
            const expiresText = l.expiresAt ? timeLeft(new Date(l.expiresAt), now, t) : null;

            return (
              <article
                key={l.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="relative h-[260px] w-full">
                    <Image
                      src={l.imageUrl}
                      alt=""
                      aria-hidden
                      fill
                      className="object-cover scale-110 blur-2xl opacity-40"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={95}
                    />

                    <Image
                      src={l.imageUrl}
                      alt={t.imageAlt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={95}
                    />

                    <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
                  </div>
                </div>
              
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="text-xs text-white/50">
                    {l.createdAt ? formatDate(new Date(l.createdAt), lang) : ""}
                  </div>

                  <div className="flex items-center gap-2">
                    {expiresText ? (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                        {expiresText}
                      </span>
                    ) : null}

                    <div className="text-xs text-white/50">{l.region ?? t.dash}</div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-white/50">{t.offer}</div>
                <ExpandableText
                  text={l.offerText ?? ""}
                  moreLabel={t.readMore}
                  lessLabel={t.readLess}
                  clampClass="line-clamp-2"
                  className="mt-1 text-sm font-semibold text-white"
                />

                <div className="mt-3 text-xs text-white/50">{t.want}</div>
                <ExpandableText
                  text={l.wantText ?? ""}
                  moreLabel={t.readMore}
                  lessLabel={t.readLess}
                  clampClass="line-clamp-2"
                  className="mt-1 text-sm text-white/80"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {l.tags?.slice(0, 8).map((x: any) => (
                    <Pill key={x.tagId}>{x.tag?.name ?? "tag"}</Pill>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-white/50">
                  <span
                    className="min-w-0 flex-1 truncate text-white/55"
                    title={l.user?.discordHandle ?? ""}
                  >
                    {l.user?.discordHandle ? l.user.discordHandle : t.contactFallback}
                  </span>

                  {l.user?.steamProfileUrl ? (
                    <a
                      href={l.user.steamProfileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                    >
                      {t.steam}
                    </a>
                  ) : (
                    <span className="shrink-0 text-white/40">{t.noSteam}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-xs text-white/60 backdrop-blur">
          {t.autoExpireNote}
        </div>
      </div>
    </main>
  );
}
