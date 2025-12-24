import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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

function formatDateBR(d: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}
function timeLeft(expiresAt: Date, now: Date) {
  const ms = expiresAt.getTime() - now.getTime();
  if (ms <= 0) return "expirado";
  const min = Math.floor(ms / 60000);
  const h = Math.floor(min / 60);
  const d = Math.floor(h / 24);

  if (d >= 2) return `expira em ${d} dias`;
  if (d === 1) return "expira em 1 dia";
  if (h >= 2) return `expira em ${h}h`;
  if (h === 1) return "expira em 1h";
  if (min >= 2) return `expira em ${min}min`;
  return "expira em instantes";
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

function buildHref(base: { q: string; region: string; sort: string; tag: string }, patch: Partial<typeof base>) {
  const next = { ...base, ...patch };
  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.region) params.set("region", next.region);
  if (next.sort) params.set("sort", next.sort);
  if (next.tag) params.set("tag", next.tag);
  const qs = params.toString();
  return qs ? `/listings?${qs}` : "/listings";
}

export default async function ListingsPage({ searchParams }: PageProps) {
  noStore();

  // ✅ suporta Next que passa searchParams como Promise
  const sp: SearchParams = (await Promise.resolve(searchParams)) ?? {};

  const now = new Date();

  const q = firstParam(sp, "q", "").trim();
  const region = firstParam(sp, "region", "").trim();
  const tag = firstParam(sp, "tag", "").trim();
  const sort = firstParam(sp, "sort", "new").trim(); // "new" | "expiring"

  const base = { q, region, sort, tag };

  let listings: any[] = [];
  let dbError: string | null = null;
  let regions: string[] = [];
  let topTags: { name: string; count: number }[] = [];
  let totalMatched = 0;

  try {
    // 🔥 "auto delete" sem cron: limpa expirados quando alguém abre o feed
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
      .sort((a, b) => a.localeCompare(b, "pt-BR"));

    const tags = tagCounts.length
      ? await prisma.tag.findMany({
          where: { id: { in: tagCounts.map((t) => t.tagId) } },
          select: { id: true, name: true },
        })
      : [];

    const tagMap = new Map(tags.map((t) => [t.id, t.name]));
    topTags = tagCounts
      .map((t) => ({
        name: tagMap.get(t.tagId) ?? "",
        count: t._count.tagId,
      }))
      .filter((t) => t.name);
  } catch (e: any) {
    dbError = e?.message ?? "Erro no banco.";
  }

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07080c]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
              🧠
            </span>
            <span className="font-semibold tracking-tight">ARC Traders</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              Início
            </Link>
            <Link
              href="/new"
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Postar troca
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>⚡ print + “ofereço / quero” + Steam/Discord</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Feed de trocas</h1>
            <p className="mt-2 text-sm text-white/70">
              Filtra, encontra e fecha direto no contato. Simples e sem drama.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/new"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Criar anúncio
            </Link>
            <Link
              href="/listings"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Limpar filtros
            </Link>
          </div>
        </div>

        {/* Filters */}
        <form
          method="GET"
          className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
        >
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-white/70">Buscar</label>
              <input
                name="q"
                defaultValue={q}
                placeholder="Ex: blueprint, mod, bateria, medkit…"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70">Região</label>
              <select
                name="region"
                defaultValue={region}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white"
              >
                <option value="">Todas</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70">Ordenar</label>
              <select
                name="sort"
                defaultValue={sort}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white"
              >
                <option value="new">Mais recentes</option>
                <option value="expiring">Expirando primeiro</option>
              </select>
            </div>
          </div>

          {/* mantém tag quando clicar em "Aplicar filtros" */}
          <input type="hidden" name="tag" value={tag} />

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-xs text-white/50">
              Mostrando <span className="text-white/80">até 30</span> de{" "}
              <span className="text-white/80">{totalMatched}</span> resultados
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Aplicar filtros
            </button>
          </div>

          {/* Tags populares como LINKS (100% confiável) */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/50">Tags populares:</span>

            <Link
              href={buildHref(base, { tag: "" })}
              className={`rounded-full border px-3 py-1 text-xs ${
                !tag
                  ? "border-white/25 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Todas
            </Link>

            {topTags.slice(0, 10).map((t) => (
              <Link
                key={t.name}
                href={buildHref(base, { tag: t.name })}
                className={`rounded-full border px-3 py-1 text-xs ${
                  tag.toLowerCase() === t.name.toLowerCase()
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {t.name} <span className="text-white/40">({t.count})</span>
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
            Nada apareceu com esses filtros. Limpa tag/região ou tenta outra busca 😈
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => {
            const expiresText =
              l.expiresAt ? timeLeft(new Date(l.expiresAt), now) : null;

            return (
              <article
                key={l.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <div className="aspect-[16/10]" />
                  <Image
                    src={l.imageUrl}
                    alt="Print do item"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-black/45 px-2 py-1 text-[11px] text-white/80 backdrop-blur">
                      print
                    </span>
                    {expiresText ? (
                      <span className="rounded-full border border-white/10 bg-black/45 px-2 py-1 text-[11px] text-white/80 backdrop-blur">
                        {expiresText}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="text-xs text-white/50">
                    {l.createdAt ? formatDateBR(new Date(l.createdAt)) : ""}
                  </div>
                  <div className="text-xs text-white/50">{l.region ?? "—"}</div>
                </div>

                <div className="mt-3 text-xs text-white/50">Ofereço</div>
                <div className="mt-1 line-clamp-1 text-sm font-semibold">{l.offerText}</div>

                <div className="mt-3 text-xs text-white/50">Quero</div>
                <div className="mt-1 line-clamp-1 text-sm text-white/80">{l.wantText}</div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {l.tags?.slice(0, 8).map((t: any) => (
                    <Pill key={t.tagId}>{t.tag?.name ?? "tag"}</Pill>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                  <span className="text-white/55">
                    {l.user?.discordHandle ? l.user.discordHandle : "contato no anúncio"}
                  </span>

                  {l.user?.steamProfileUrl ? (
                    <a
                      href={l.user.steamProfileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                    >
                      Steam
                    </a>
                  ) : (
                    <span className="text-white/40">sem steam</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-xs text-white/60 backdrop-blur">
          Os anúncios expiram e somem do feed automaticamente. Quer renovar? Posta de novo com print atualizado.
        </div>
      </div>
    </main>
  );
}
