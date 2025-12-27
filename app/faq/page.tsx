import Link from "next/link";

export const metadata = {
  title: "FAQ | ARC Traders",
  description:
    "Dúvidas frequentes sobre anúncios, expiração, segurança e como trocar itens no ARC Traders.",
};

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
}: {
  q: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-white/20"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white">
        <span>{q}</span>
        <span className="shrink-0 rounded-xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70 group-open:bg-white/10">
          <span className="group-open:hidden">abrir</span>
          <span className="hidden group-open:inline">fechar</span>
        </span>
      </summary>

      <div className="mt-3 text-sm leading-relaxed text-white/70">{children}</div>
    </details>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-white/70">{subtitle}</p> : null}
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>


      <div className="mx-auto max-w-6xl px-4 py-10">
        <Badge>🧩 respostas rápidas, sem textão inútil</Badge>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">F.A.Q</h1>
            <p className="mt-2 text-sm text-white/70">
              Tudo que a galera pergunta antes de postar (e o que evita dor de cabeça depois).
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/new"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Postar agora
            </Link>
            <Link
              href="/listings"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Ver feed
            </Link>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* FAQ */}
          <div className="space-y-8">
            <section id="geral" className="space-y-4">
              <SectionTitle title="Geral" subtitle="O que é, o que não é, e por que existe." />
              <div className="space-y-3">
                <FAQItem q="O que é o ARC Traders? 🤝" defaultOpen>
                  Um feed de anúncios de troca pro ARC Raiders: você posta um print do item, descreve o que quer em
                  troca e deixa um contato (Steam/Discord). A negociação acontece direto com você.
                </FAQItem>

                <FAQItem q="Precisa criar conta?">
                  Por enquanto, não. A ideia é ser rápido: postou, apareceu. No futuro pode rolar conta pra recursos
                  tipo histórico, favoritos e moderação mais forte, mas o MVP é sem burocracia.
                </FAQItem>

                <FAQItem q="Vocês são oficiais do ARC Raiders?">
                  Não. É um projeto fan-made, sem afiliação com Embark/Nexon. O objetivo é organizar trocas, não
                  “representar” o jogo.
                </FAQItem>
              </div>
            </section>

            <section id="postar" className="space-y-4">
              <SectionTitle title="Postando anúncios" subtitle="Como criar um anúncio que dá match de verdade." />
              <div className="space-y-3">
                <FAQItem q="O que eu preciso pra postar?">
                  Três coisas: <b>print do item</b>, <b>Ofereço/Quero</b> bem escrito e <b>Steam ou Discord</b>.
                  Se faltar isso, vira anúncio fantasma.
                </FAQItem>

                <FAQItem q="Como faço pro meu print ficar bonito no feed?">
                  Usa o recorte/zoom na página de criação. A regra é simples: item grande, HUD pequeno. Quanto mais
                  nítido, mais rápido alguém te chama.
                </FAQItem>

                <FAQItem q="Tags servem pra quê?">
                  Pra busca funcionar de verdade. Exemplo: “mod”, “rare”, “battery”, “medkit”, “BR”. O feed fica muito
                  mais “encontrável”.
                </FAQItem>

                <FAQItem q="Posso postar mais de um item no mesmo anúncio?">
                  Pode, mas fica esperto: se o print vira bagunça, ninguém entende. Melhor é 1 item por anúncio quando
                  dá, ou no máximo um combo bem explicado.
                </FAQItem>
              </div>
            </section>

            <section id="expiracao" className="space-y-4">
              <SectionTitle title="Expiração" subtitle="Pra manter o feed vivo e sem anúncio velho encalhado." />
              <div className="space-y-3">
                <FAQItem q="Como funciona a expiração (1, 3, 7 dias)?">
                  Você escolhe na criação. Quando vence, o anúncio some do feed automaticamente. A ideia é evitar troca
                  “morta” ocupando espaço.
                </FAQItem>

                <FAQItem q="Expirou. Perdi tudo?">
                  Você só precisa postar de novo (e se quiser, usa o mesmo print). A expiração é feita pra manter o
                  feed atual, não pra te punir.
                </FAQItem>
              </div>
            </section>

            <section id="seguranca" className="space-y-4">
              <SectionTitle title="Segurança"/>
              <div className="space-y-3">
                <FAQItem q="É permitido RMT (dinheiro real, pix, venda)?">
                 Sim, porem não nos responsabilizamos por perdas ou golpes.
                </FAQItem>

                <FAQItem q="Como evitar golpe?">
                  Coisas clássicas: link estranho, pressa demais, ou papo de “manda item
                  primeiro”. Se tá cheirando golpe, provavelmente é. Sai fora.
                </FAQItem>

                <FAQItem q="Dá pra denunciar alguém?">
                  é simples. Por enquanto, o caminho é: não fechar com a pessoa e, se for golpe, mandar o
                  link do anúncio pra gente implementar um sistema de report depois.
                </FAQItem>
              </div>
            </section>

            <section id="privacidade" className="space-y-4">
              <SectionTitle title="Privacidade" subtitle="O que fica público e o que você controla." />
              <div className="space-y-3">
                <FAQItem q="O que fica público no anúncio?">
                  O print, seu texto e o contato que você escolher mostrar (Steam/Discord). Se não quer expor algo,
                  não coloca. Simples.
                </FAQItem>

                <FAQItem q="Vocês guardam meus dados?">
                  A gente só guarda o que você envia no anúncio. Sem login no MVP, então não tem perfil completo nem
                  senha armazenada.
                </FAQItem>
              </div>
            </section>

            <section id="problemas" className="space-y-4">
              <SectionTitle title="Problemas comuns" subtitle="Quando algo não aparece ou dá ruim." />
              <div className="space-y-3">
                <FAQItem q="Postei e não apareceu no feed. Por quê?">
                  Normalmente é: anúncio expirado (data errada), erro no upload, ou filtro ativo (tag/região/busca).
                  Testa abrindo o feed com “Limpar filtros”.
                </FAQItem>

                <FAQItem q="Meu print ficou esticado ou cortado estranho.">
                  O feed usa proporção 16:10. Na criação, recorta e ajusta o zoom pra ficar certinho. Aí o card fica
                  perfeito.
                </FAQItem>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-sm font-semibold">Atalhos</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="#geral" className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10">
                  Geral
                </a>
                <a href="#postar" className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10">
                  Postar
                </a>
                <a href="#expiracao" className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10">
                  Expiração
                </a>
                <a href="#seguranca" className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10">
                  Segurança
                </a>
                <a href="#privacidade" className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10">
                  Privacidade
                </a>
                <a href="#problemas" className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/75 hover:bg-white/10">
                  Problemas
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur">
              <div className="font-semibold text-white">Dica de ouro</div>
              <p className="mt-2">
                Anúncio bom é anúncio que dá match: print legível + descrição objetiva + contato fácil. Se tá confuso,
                ninguém chama.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-xs text-white/55 backdrop-blur">
              Fan-made, sem afiliação oficial.🤝
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
