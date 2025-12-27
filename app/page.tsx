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
}: {
  listing: {
    id: string;
    imageUrl: string;
    offerText: string;
    wantText: string;
    region: string | null;
    createdAt: Date;
    user: { displayName: string | null; steamProfileUrl: string | null; discordHandle: string | null };
    tags: { tagId: string; tag: { name: string } }[];
  };
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/20 hover:bg-white/10">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <div className="aspect-[16/10]" />
        <Image
          src={listing.imageUrl}
          alt="Print do item"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-3">
        <div className="text-xs text-white/50">Ofereço</div>
        <div className="mt-1 line-clamp-1 text-sm font-semibold text-white">{listing.offerText}</div>

        <div className="mt-3 text-xs text-white/50">Quero</div>
        <div className="mt-1 line-clamp-1 text-sm text-white/80">{listing.wantText}</div>

        <div className="mt-3 flex flex-wrap gap-2">
          {listing.tags.slice(0, 6).map((t) => (
            <Pill key={t.tagId}>{t.tag.name}</Pill>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-white/55">
          <span>{listing.region ?? "—"}</span>

          {listing.user?.steamProfileUrl ? (
            <a
              href={listing.user.steamProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Steam
            </a>
          ) : listing.user?.discordHandle ? (
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/70">
              Discord ok
            </span>
          ) : (
            <span className="text-white/35">sem contato</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [
    totalListings,
    activeListings,
    listingsLast24h,
    latestListings,
    topTagCounts,
  ] = await Promise.all([
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
        where: { id: { in: topTagCounts.map((t) => t.tagId) } },
      })
    : [];

  const tagMap = new Map(tags.map((t) => [t.id, t.name]));
  const topTags = topTagCounts
    .map((t) => ({
      id: t.tagId,
      name: tagMap.get(t.tagId) ?? "tag",
      count: t._count.tagId,
    }))
    .filter((t) => t.name !== "tag");

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge>3 passos para trocar</Badge>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Posta seu item. A galera vê. Você troca.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/70">
              ARC Traders é um feed de trocas direto ao ponto: print do item, o que você quer em troca e um contato.
              Sem conta, sem cadastro chato.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                Postar agora
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Abrir o feed
              </Link>
            </div>

            {/* Real stats (sem users) */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              <Stat label="Anúncios no total" value={String(totalListings)} hint="tudo que já foi postado" />
              <Stat label="Novos nas 24h" value={String(listingsLast24h)} hint="movimento recente" />
              <Stat label="Ativos agora" value={String(activeListings)} hint="aparecem no feed" />
            </div>

            {/* Safety / rules */}
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur">
              <div className="font-semibold text-white">Regras rápidas</div>
              <ul className="mt-3 space-y-2">
                <li>✅ Print obrigatório (recorta/zoom pra ficar legível).</li>
                <li>✅ .</li>
                <li>✅ .</li>
              </ul>
            </div>

            {/* Trending tags */}
            <div className="mt-6">
              <div className="text-xs text-white/50">Oque esta mais vendendo</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {topTags.length ? (
                  topTags.map((t) => (
                    <Pill key={t.id}>
                      {t.name} <span className="text-white/40">({t.count})</span>
                    </Pill>
                  ))
                ) : (
                  <>
                    <Pill>sem tags ainda</Pill>
                    <Pill>posta e inaugura</Pill>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Live feed preview */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">Anuncios</div>
                <div className="text-xs text-white/60">últimas trocas publicadas pela comunidade</div>
              </div>
              <div className="text-xs text-white/50">24h: {listingsLast24h} novos</div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {latestListings.slice(0, 4).map((l) => (
                <ListingCard key={l.id} listing={l as any} />
              ))}
            </div>

            {latestListings.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-white/70">
                Ainda não tem anúncios. Poste e seja o primeiro
              </div>
            ) : null}

            <div className="mt-4 flex justify-end">
              <Link
                href="/listings"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver todos os anuncios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionTitle
          title="Como funciona"
          subtitle="Três passos, zero burocracia."
          right={
            <Link
              href="/new"
              className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:inline-flex"
            >
              Postar troca
            </Link>
          }
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg">🖼️</div>
            <div className="mt-3 text-base font-semibold">Sobe o print</div>
            <div className="mt-2 text-sm text-white/70">
              Print mostra a real. Recorta e dá zoom pra deixar o item nítido.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg">🏷️</div>
            <div className="mt-3 text-base font-semibold">Escreve a troca</div>
            <div className="mt-2 text-sm text-white/70">
              “Ofereço” e “Quero” bem descritos fazem a galera te achar rapidinho.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-lg">🤝</div>
            <div className="mt-3 text-base font-semibold">Deixa contato</div>
            <div className="mt-2 text-sm text-white/70">
              Steam/Discord ou tag no jogo. A negociação acontece direto com você.
            </div>
          </div>
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          Fan-made, sem afiliação oficial.🤝
        </footer>
      </section>
    </main>
  );
}
