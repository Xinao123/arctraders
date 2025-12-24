import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const revalidate = 30; // atualiza a home a cada 30s (muda pra 60/300 se quiser)

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <div className="text-sm font-semibold text-white">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </div>
  );
}

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20 hover:bg-white/10">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
          {icon}
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-white/70">{desc}</div>
        </div>
      </div>
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
    user: { steamProfileUrl: string | null; discordHandle: string | null; displayName: string | null };
    tags: { tagId: string; tag: { name: string } }[];
  };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/20 hover:bg-white/10">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <div className="aspect-[16/10]" />
        <Image
          src={listing.imageUrl}
          alt="Print do item"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2 py-1 text-[11px] text-white/70">
          print
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs text-white/50">Ofereço</div>
        <div className="mt-1 line-clamp-1 text-sm font-semibold text-white">
          {listing.offerText}
        </div>

        <div className="mt-3 text-xs text-white/50">Quero</div>
        <div className="mt-1 line-clamp-1 text-sm text-white/80">
          {listing.wantText}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {listing.tags.slice(0, 6).map((t) => (
            <Pill key={t.tagId}>{t.tag.name}</Pill>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-white/50">
            {listing.region ?? "—"}
          </div>

          {listing.user?.steamProfileUrl ? (
            <a
              href={listing.user.steamProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Steam
            </a>
          ) : (
            <span className="text-xs text-white/40">sem steam</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [totalListings, listingsLast24h, totalUsers, latestListings, topTagCounts] =
    await Promise.all([
      prisma.listing.count(),
      prisma.listing.count({ where: { createdAt: { gte: since24h } } }),
      prisma.user.count(),
      prisma.listing.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        include: {
          user: true,
          tags: { include: { tag: true } },
        },
      }),
      prisma.listingTag.groupBy({
        by: ["tagId"],
        _count: { tagId: true },
        orderBy: { _count: { tagId: "desc" } },
        take: 8,
      }),
    ]);

  const topTags = topTagCounts.length
    ? await prisma.tag.findMany({
        where: { id: { in: topTagCounts.map((t) => t.tagId) } },
      })
    : [];

  const tagMap = new Map(topTags.map((t) => [t.id, t.name]));
  const topTagsWithCounts = topTagCounts
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
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.10),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07080c]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
              🧩
            </span>
            <span className="font-semibold tracking-tight">ARC TRADERS</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/listings"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              Anúncios
            </Link>
            <Link
              href="/new"
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Criar anúncio
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge>
              ⚡ print + “quero em troca” + perfil <span className="text-white/40">|</span> sem enrolação
            </Badge>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Trocas do ARC Raiders com cara de comunidade, não de cassino.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/70">
              Anúncios reais, feed limpo e contato direto. Sem papinho, sem “manda pix pra reservar”.
              Postou, apareceu.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                Criar meu anúncio
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Explorar anúncios
              </Link>
            </div>

            {/* Stats reais */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              <Stat label="Anúncios no total" value={String(totalListings)} />
              <Stat label="Novos (24h)" value={String(listingsLast24h)} />
              <Stat label="Usuários" value={String(totalUsers)} />
            </div>

            {/* Tags reais */}
            <div className="mt-6">
              <div className="text-xs text-white/50">Tags populares agora</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {topTagsWithCounts.length ? (
                  topTagsWithCounts.map((t) => (
                    <Pill key={t.id}>
                      {t.name} <span className="text-white/40">({t.count})</span>
                    </Pill>
                  ))
                ) : (
                  <>
                    <Pill>sem tags ainda</Pill>
                    <Pill>poste um anúncio </Pill>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Preview real */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Últimos anúncios</div>
                <div className="text-xs text-white/60">isso aqui é do banco, sem fake</div>
              </div>
              <div className="text-xs text-white/50">
                últimos 24h: {listingsLast24h}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {latestListings.slice(0, 4).map((l) => (
                <ListingCard key={l.id} listing={l as any} />
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                href="/listings"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver feed completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Como funciona</h2>
            <p className="mt-2 text-sm text-white/70">
              Três passos, sem tutorial infinito.
            </p>
          </div>
          <Link
            href="/new"
            className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:inline-flex"
          >
            Postar agora
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Feature
            icon="🖼️"
            title="Posta o print"
            desc="O print dá confiança. E agora ele aparece no feed real."
          />
          <Feature
            icon="🔁"
            title="Diz o que quer"
            desc="Texto e tags fazem a busca funcionar de verdade."
          />
          <Feature
            icon="🤝"
            title="Combina e fecha"
            desc="Steam/Discord pra chamar e pronto. Sem drama."
          />
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          Fan-made, sem afiliação oficial. Sem RMT. Seja gente boa. 🤝
        </footer>
      </section>
    </main>
  );
}
