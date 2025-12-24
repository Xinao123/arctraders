import Link from "next/link";

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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <div className="text-sm font-semibold text-white">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </div>
  );
}

function ListingMock({
  offer,
  want,
  tags,
}: {
  offer: string;
  want: string;
  tags: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/20 hover:bg-white/10">
      {/* “Print” fake */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
        <div className="aspect-[16/10]" />
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[11px] text-white/70">
          print
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs text-white/50">Ofereço</div>
        <div className="mt-1 line-clamp-1 text-sm font-semibold text-white">{offer}</div>

        <div className="mt-3 text-xs text-white/50">Quero</div>
        <div className="mt-1 line-clamp-1 text-sm text-white/80">{want}</div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-white/50">há 12 min</div>
          <button className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10">
            Chamar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      {/* Background “grid glow” */}
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
            <span className="font-semibold tracking-tight">ARC Swap</span>
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
              ⚡ print + “quero em troca” + perfil <span className="text-white/40">|</span>{" "}
              sem enrolação
            </Badge>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Trocas do ARC Raiders com cara de comunidade, não de cassino.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/70">
              Você posta um print do item, escreve o que quer em troca e deixa Steam/Discord.
              A galera combina raid e pronto. O resto é reputação e bom senso.
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

            <div className="mt-7 grid grid-cols-3 gap-3">
              <Stat label="Golpe evitado" value="Reputação" />
              <Stat label="Busca decente" value="Texto + Tags" />
              <Stat label="Zero drama" value="Chat" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <Pill>fan-made</Pill>
              <Pill>sem RMT</Pill>
              <Pill>denúncia 1 clique</Pill>
              <Pill>bloqueio</Pill>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Preview do feed</div>
                <div className="text-xs text-white/60">como vai ficar a vibe dos anúncios</div>
              </div>
              <div className="text-xs text-white/50">online agora: 23</div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ListingMock
                offer="Blueprint: Shock Module (Rare)"
                want="Bateria Militar + 2x Medkit"
                tags={["mod", "rare", "BR"]}
              />
              <ListingMock
                offer="Weapon Part: Arc Barrel Mk.2"
                want="Blueprint de mochila ou mods de recoil"
                tags={["weapon", "part", "SA"]}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/60">Dica rápida</div>
              <div className="mt-1 text-sm text-white/80">
                Print ajuda a confiar, mas o texto é o que faz a busca funcionar. Então usa os dois.
              </div>
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
              Três passos, sem tutorial de 40 minutos no YouTube.
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
            desc="Upload do item. Se quiser, bota um nome/descrição pra aparecer bem na busca."
          />
          <Feature
            icon="🔁"
            title="Diz o que quer"
            desc="“Quero em troca” e tags. Região e horário ajudam a fechar rápido."
          />
          <Feature
            icon="🤝"
            title="Combina e fecha"
            desc="Chat e vouch. Troca concluída = reputação. Golpista odeia isso."
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          Fan-made, sem afiliação oficial. Sem RMT. Seja gente boa. 🤝
        </footer>
      </section>
    </main>
  );
}
