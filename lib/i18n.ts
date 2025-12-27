import type { Lang } from "@/lib/getLang";

type NewDict = {
  badge: string;
  title: string;
  subtitle: string;
  backFeed: string;

  detailsTitle: string;
  offerLabel: string;
  offerPh: string;
  wantLabel: string;
  wantPh: string;

  tagsLabel: string;
  tagsPh: string;

  regionLabel: string;
  regionPh: string;

  expiresLabel: string;
  expiresHint: string;
  exp5m: string;
  exp1d: string;
  exp3d: string;
  exp7d: string;

  contactTitle: string;
  steamLabel: string;
  steamPh: string;
  discordLabel: string;
  discordPh: string;

  ruleRmt: string;
  ruleClear: string;

  imageTitle: string;
  imageSubtitle: string;
  choose: string;
  noImage: string;
  cropBtn: string;
  useOriginalBtn: string;

  submit: string;
  submitting: string;

  footer: string;

  cropTitle: string;
  cropSubtitle: string;
  horizontal: string;
  vertical: string;
  rotate90: string;
  zoom: string;
  rotationNow: string;
  useCrop: string;
  cancel: string;

  errNeedOfferWant: string;
  errNeedImage: string;
  errUploadFail: string;
  errCreateFail: string;
  errResponse: string;
  errTryAgain: string;
  errCropFail: string;

  previewAlt: string;
};

type ListingsDict = {
  badge: string;
  title: string;
  subtitle: string;

  create: string;
  clear: string;

  searchLabel: string;
  searchPh: string;

  regionLabel: string;
  regionAll: string;

  sortLabel: string;
  sortNew: string;
  sortExpiring: string;

  showingPrefix: string; // "Showing up to"
  showingMid: string; // "of"
  showingSuffix: string; // "results"
  apply: string;

  popularTags: string;
  allTags: string;

  emptyFilters: string;

  imageAlt: string;
  pillPrint: string;

  createdAtTz: string; // label for timezone formatting (optional)
  dash: string;

  offer: string;
  want: string;

  contactFallback: string;
  noSteam: string;
  steam: string;

  expiresExpired: string;
  expiresIn: string;
  day: string;
  days: string;
  hourShort: string;
  minuteShort: string;
  moments: string;

  autoExpireNote: string;
};

type FAQDict = {
  // Optional, se você quiser usar em generateMetadata
  metaTitle: string;
  metaDescription: string;

  badge: string;
  title: string;
  subtitle: string;

  ctaPost: string;
  ctaFeed: string;

  open: string;
  close: string;

  // Sections
  generalTitle: string;
  generalSubtitle: string;

  postingTitle: string;
  postingSubtitle: string;

  expirationTitle: string;
  expirationSubtitle: string;

  safetyTitle: string;

  privacyTitle: string;
  privacySubtitle: string;

  issuesTitle: string;
  issuesSubtitle: string;

  // General Q/A
  g1q: string;
  g1a: string;
  g2q: string;
  g2a: string;
  g3q: string;
  g3a: string;

  // Posting Q/A
  p1q: string;
  p1a: string;
  p2q: string;
  p2a: string;
  p3q: string;
  p3a: string;
  p4q: string;
  p4a: string;

  // Expiration Q/A
  e1q: string;
  e1a: string;
  e2q: string;
  e2a: string;

  // Safety Q/A
  s1q: string;
  s1a: string;
  s2q: string;
  s2a: string;
  s3q: string;
  s3a: string;

  // Privacy Q/A
  pr1q: string;
  pr1a: string;
  pr2q: string;
  pr2a: string;

  // Issues Q/A
  i1q: string;
  i1a: string;
  i2q: string;
  i2a: string;

  // Sidebar
  shortcutsTitle: string;
  shGeneral: string;
  shPosting: string;
  shExpiration: string;
  shSafety: string;
  shPrivacy: string;
  shIssues: string;

  tipTitle: string;
  tipBody: string;

  footer: string;
};

type Dict = {
  // Home
  badge: string;
  title: string;
  subtitle: string;
  postNow: string;
  openFeed: string;

  total: string;
  totalHint: string;
  new24h: string;
  new24hHint: string;
  activeNow: string;
  activeNowHint: string;

  rulesTitle: string;
  rules1: string;
  rules2: string;
  rules3: string;

  trendingTitle: string;
  noTags1: string;
  noTags2: string;

  previewTitle: string;
  previewSubtitle: string;
  previewNewPrefix: string;
  previewNewSuffix: string;
  emptyPreview: string;
  viewAll: string;

  cardOffer: string;
  cardWant: string;
  discordAvailable: string;
  noContact: string;
  imageAlt: string;

  howTitle: string;
  howSubtitle: string;
  howCta: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  footer: string;

  // New + Listings + FAQ
  new: NewDict;
  listings: ListingsDict;
  faq: FAQDict;
};

export const i18n = {
  pt: {
    // Home
    badge: "3 passos para trocar",
    title: "Posta seu item. A galera vê. Você troca.",
    subtitle:
      "ARC Traders é um feed de trocas direto ao ponto: print do item, o que você quer em troca e um contato. Sem conta, sem cadastro chato.",
    postNow: "Postar agora",
    openFeed: "Abrir o feed",

    total: "Anúncios no total",
    totalHint: "tudo que já foi postado",
    new24h: "Novos nas 24h",
    new24hHint: "movimento recente",
    activeNow: "Ativos agora",
    activeNowHint: "aparecem no feed",

    rulesTitle: "Regras rápidas",
    rules1: "Print obrigatório (recorta/zoom pra ficar legível).",
    rules2: "Seja específico: “Ofereço” e “Quero” bem descritos.",
    rules3: "Sem taxa, sem reserva paga, sem intermediário. Só troca.",

    trendingTitle: "Tags em alta",
    noTags1: "sem tags ainda",
    noTags2: "poste e comece a trend",

    previewTitle: "Anúncios",
    previewSubtitle: "últimas trocas publicadas pela comunidade",
    previewNewPrefix: "24h: ",
    previewNewSuffix: " novos",
    emptyPreview: "Ainda não tem anúncios. Poste e seja o primeiro.",
    viewAll: "Ver todos os anúncios",

    cardOffer: "Ofereço",
    cardWant: "Quero",
    discordAvailable: "Discord disponível",
    noContact: "sem contato",
    imageAlt: "Print do item",

    howTitle: "Como funciona",
    howSubtitle: "Três passos, zero burocracia.",
    howCta: "Postar troca",
    step1Title: "Sobe o print",
    step1Desc: "Print mostra a real. Recorta e dá zoom pra deixar o item nítido.",
    step2Title: "Escreve a troca",
    step2Desc: "“Ofereço” e “Quero” bem descritos fazem a galera te achar rapidinho.",
    step3Title: "Deixa contato",
    step3Desc: "Steam/Discord ou tag no jogo. A negociação acontece direto com você.",

    footer: "Fan-made, sem afiliação oficial.",

    // New
    new: {
      badge: "print + oferta + troca + contato",
      title: "Criar anúncio",
      subtitle: "Faz um anúncio que dá match: print legível + texto objetivo + contato fácil.",
      backFeed: "Voltar pro feed",

      detailsTitle: "Detalhes da troca",
      offerLabel: "Ofereço",
      offerPh: "Ex: Battery pack, mod raro, blueprint…",
      wantLabel: "Quero",
      wantPh: "Ex: medkit, mod específico, troca 1:1…",

      tagsLabel: "Tags (separa por vírgula)",
      tagsPh: "Ex: blueprint, mod, rare, BR, EU…",

      regionLabel: "Região (opcional)",
      regionPh: "Ex: BR / SA / NA / EU…",

      expiresLabel: "Expiração",
      expiresHint: "Quando expirar, o anúncio some do feed automaticamente.",
      exp5m: "5 minutos (teste)",
      exp1d: "1 dia",
      exp3d: "3 dias",
      exp7d: "7 dias",

      contactTitle: "Contato",
      steamLabel: "Steam (link do perfil)",
      steamPh: "https://steamcommunity.com/id/...",
      discordLabel: "Discord (opcional)",
      discordPh: "ex: yas#0001",

      ruleRmt: "Sem dinheiro real (RMT)",
      ruleClear: "Print claro = mais chance de fechar",

      imageTitle: "Imagem do item",
      imageSubtitle: "Selecione um print e recorte pra ficar bonito no feed.",
      choose: "Escolher",
      noImage: "Sem imagem ainda. Escolhe um print pra começar.",
      cropBtn: "Recortar (H/V)",
      useOriginalBtn: "Usar original",

      submit: "Publicar anúncio",
      submitting: "Postando...",

      footer: "Fan-made, sem afiliação oficial.",

      cropTitle: "Recortar imagem",
      cropSubtitle:
        "Horizontal/vertical + zoom + rotação. O recorte sai na resolução original (sem limitar pixels).",
      horizontal: "Horizontal",
      vertical: "Vertical",
      rotate90: "Girar 90°",
      zoom: "Zoom",
      rotationNow: "Rotação atual:",
      useCrop: "Usar recorte",
      cancel: "Cancelar",

      errNeedOfferWant: "Preenche pelo menos ‘Ofereço’ e ‘Quero’.",
      errNeedImage: "Selecione uma imagem do item (print).",
      errUploadFail: "Falha no upload",
      errCreateFail: "Falha ao criar anúncio",
      errResponse: "Resposta",
      errTryAgain: "Deu ruim. Tenta de novo.",
      errCropFail: "Falha ao recortar a imagem.",

      previewAlt: "Preview",
    },

    // Listings
    listings: {
      badge: "⚡ print + “ofereço / quero” + Steam/Discord",
      title: "Feed de trocas",
      subtitle: "Filtra, encontra e fecha direto no contato. Simples e sem drama.",

      create: "Criar anúncio",
      clear: "Limpar filtros",

      searchLabel: "Buscar",
      searchPh: "Ex: blueprint, mod, bateria, medkit…",

      regionLabel: "Região",
      regionAll: "Todas",

      sortLabel: "Ordenar",
      sortNew: "Mais recentes",
      sortExpiring: "Expirando primeiro",

      showingPrefix: "Mostrando até",
      showingMid: "de",
      showingSuffix: "resultados",
      apply: "Aplicar filtros",

      popularTags: "Tags populares:",
      allTags: "Todas",

      emptyFilters: "Nada apareceu com esses filtros. Limpa tag/região ou tenta outra busca.",

      imageAlt: "Print do item",
      pillPrint: "print",

      createdAtTz: "",
      dash: "—",

      offer: "Ofereço",
      want: "Quero",

      contactFallback: "contato no anúncio",
      noSteam: "sem steam",
      steam: "Steam",

      expiresExpired: "expirado",
      expiresIn: "expira em",
      day: "dia",
      days: "dias",
      hourShort: "h",
      minuteShort: "min",
      moments: "instantes",

      autoExpireNote:
        "Os anúncios expiram e somem do feed automaticamente. Quer renovar? Posta de novo com print atualizado.",
    },

    // FAQ
    faq: {
      metaTitle: "FAQ | ARC Traders",
      metaDescription:
        "Dúvidas frequentes sobre anúncios, expiração, segurança e como trocar itens no ARC Traders.",

      badge: "respostas rápidas, sem textão inútil",
      title: "F.A.Q",
      subtitle: "Tudo que a galera pergunta antes de postar (e o que evita dor de cabeça depois).",

      ctaPost: "Postar agora",
      ctaFeed: "Ver feed",

      open: "abrir",
      close: "fechar",

      generalTitle: "Geral",
      generalSubtitle: "O que é, o que não é, e por que existe.",

      postingTitle: "Postando anúncios",
      postingSubtitle: "Como criar um anúncio que dá match de verdade.",

      expirationTitle: "Expiração",
      expirationSubtitle: "Pra manter o feed vivo e sem anúncio velho encalhado.",

      safetyTitle: "Segurança",

      privacyTitle: "Privacidade",
      privacySubtitle: "O que fica público e o que você controla.",

      issuesTitle: "Problemas comuns",
      issuesSubtitle: "Quando algo não aparece ou dá ruim.",

      g1q: "O que é o ARC Traders?",
      g1a:
        "Um feed de anúncios de troca pro ARC Raiders: você posta um print do item, descreve o que quer em troca e deixa um contato (Steam/Discord). A negociação acontece direto com você.",
      g2q: "Precisa criar conta?",
      g2a:
        "Por enquanto, não. A ideia é ser rápido: postou, apareceu. No futuro pode rolar conta pra recursos tipo histórico, favoritos e moderação mais forte, mas o MVP é sem burocracia.",
      g3q: "Vocês são oficiais do ARC Raiders?",
      g3a:
        "Não. É um projeto fan-made, sem afiliação com Embark/Nexon. O objetivo é organizar trocas, não “representar” o jogo. Projeto open source.",

      p1q: "O que eu preciso pra postar?",
      p1a:
        "Três coisas: print do item, “Ofereço/Quero” bem escrito e Steam ou Discord. Se faltar isso, vira anúncio fantasma.",
      p2q: "Como faço pro meu print ficar bonito no feed?",
      p2a:
        "Usa o recorte/zoom na página de criação. A regra é simples: item grande, HUD pequeno. Quanto mais nítido, mais rápido alguém te chama.",
      p3q: "Tags servem pra quê?",
      p3a:
        "Pra busca funcionar de verdade. Exemplo: “mod”, “rare”, “battery”, “medkit”, “BR”. O feed fica muito mais encontrável.",
      p4q: "Posso postar mais de um item no mesmo anúncio?",
      p4a:
        "Pode, mas cuidado: se o print vira bagunça, ninguém entende. Melhor é 1 item por anúncio quando dá, ou no máximo um combo bem explicado.",

      e1q: "Como funciona a expiração (1, 3, 7 dias)?",
      e1a:
        "Você escolhe na criação. Quando vence, o anúncio some do feed automaticamente. A ideia é evitar troca “morta” ocupando espaço.",
      e2q: "Expirou. Perdi tudo?",
      e2a:
        "Você só precisa postar de novo (e se quiser, usa o mesmo print). A expiração é feita pra manter o feed atual, não pra te punir.",

      s1q: "É permitido RMT (dinheiro real, pix, venda)?",
      s1a: "Sim, porém não nos responsabilizamos por perdas ou golpes.",
      s2q: "Como evitar golpe?",
      s2a:
        "Clássicos: link estranho, pressa demais, ou papo de “manda item primeiro”. Se tá cheirando golpe, provavelmente é. Sai fora.",
      s3q: "Dá pra denunciar alguém?",
      s3a:
        "Por enquanto é simples: não feche com a pessoa e, se for golpe, mande o link do anúncio pra gente. Depois a gente coloca um sistema de report.",

      pr1q: "O que fica público no anúncio?",
      pr1a:
        "O print, seu texto e o contato que você escolher mostrar (Steam/Discord). Se não quer expor algo, não coloca. Simples.",
      pr2q: "Vocês guardam meus dados?",
      pr2a:
        "A gente só guarda o que você envia no anúncio. Sem login no MVP, então não tem perfil completo nem senha armazenada.",

      i1q: "Postei e não apareceu no feed. Por quê?",
      i1a:
        "Normalmente é: anúncio expirado (data errada), erro no upload, ou filtro ativo (tag/região/busca). Testa abrindo o feed com “Limpar filtros”.",
      i2q: "Meu print ficou esticado ou cortado estranho.",
      i2a:
        "O feed usa proporção 16:10. Na criação, recorta e ajusta o zoom pra ficar certinho. Aí o card fica perfeito.",

      shortcutsTitle: "Atalhos",
      shGeneral: "Geral",
      shPosting: "Postar",
      shExpiration: "Expiração",
      shSafety: "Segurança",
      shPrivacy: "Privacidade",
      shIssues: "Problemas",

      tipTitle: "Dica de ouro",
      tipBody:
        "Anúncio bom é anúncio que dá match: print legível + descrição objetiva + contato fácil. Se tá confuso, ninguém chama.",

      footer: "Fan-made, sem afiliação oficial.",
    },
  },

  en: {
    // Home
    badge: "3 steps to trade",
    title: "Post your item. People see it. You trade.",
    subtitle:
      "ARC Traders is a no-nonsense trade feed: upload a screenshot, write what you want in return, and leave a contact. No account. No annoying signup.",
    postNow: "Post now",
    openFeed: "Open the feed",

    total: "Total listings",
    totalHint: "everything ever posted",
    new24h: "New in the last 24h",
    new24hHint: "recent activity",
    activeNow: "Active right now",
    activeNowHint: "visible in the feed",

    rulesTitle: "Quick rules",
    rules1: "Screenshot required (crop/zoom so the item is readable).",
    rules2: "Be specific: clear “Offering” and “Looking for” text.",
    rules3: "No fees, no paid reservations, no middleman. Trade-only.",

    trendingTitle: "Trending tags",
    noTags1: "no tags yet",
    noTags2: "post and start the trend",

    previewTitle: "Listings",
    previewSubtitle: "latest trades posted by the community",
    previewNewPrefix: "24h: ",
    previewNewSuffix: " new",
    emptyPreview: "No listings yet. Post one and be the first.",
    viewAll: "View all listings",

    cardOffer: "Offering",
    cardWant: "Looking for",
    discordAvailable: "Discord available",
    noContact: "no contact",
    imageAlt: "Item screenshot",

    howTitle: "How it works",
    howSubtitle: "Three steps, zero bureaucracy.",
    howCta: "Post a trade",
    step1Title: "Upload the screenshot",
    step1Desc: "Screenshots keep it real. Crop and zoom so the item is clearly visible.",
    step2Title: "Write the trade",
    step2Desc: "Clear “Offering” and “Looking for” descriptions help people find you fast.",
    step3Title: "Leave a contact",
    step3Desc: "Steam/Discord or your in-game tag. Negotiation happens directly with you.",

    footer: "Fan-made. Not officially affiliated.",

    // New
    new: {
      badge: "screenshot + offer + want + contact",
      title: "Create listing",
      subtitle: "Make it easy to match: readable screenshot + clear text + easy contact.",
      backFeed: "Back to feed",

      detailsTitle: "Trade details",
      offerLabel: "Offering",
      offerPh: "e.g. Battery pack, rare mod, blueprint…",
      wantLabel: "Looking for",
      wantPh: "e.g. medkit, specific mod, 1:1…",

      tagsLabel: "Tags (comma-separated)",
      tagsPh: "e.g. blueprint, mod, rare, BR, EU…",

      regionLabel: "Region (optional)",
      regionPh: "e.g. BR / SA / NA / EU…",

      expiresLabel: "Expiration",
      expiresHint: "When it expires, the listing automatically disappears from the feed.",
      exp5m: "5 minutes (test)",
      exp1d: "1 day",
      exp3d: "3 days",
      exp7d: "7 days",

      contactTitle: "Contact",
      steamLabel: "Steam (profile link)",
      steamPh: "https://steamcommunity.com/id/...",
      discordLabel: "Discord (optional)",
      discordPh: "e.g. yas#0001",

      ruleRmt: "No real-money trading (RMT)",
      ruleClear: "Clear screenshots get more replies",

      imageTitle: "Item image",
      imageSubtitle: "Pick a screenshot and crop it to look great in the feed.",
      choose: "Choose",
      noImage: "No image yet. Pick a screenshot to start.",
      cropBtn: "Crop (H/V)",
      useOriginalBtn: "Use original",

      submit: "Publish listing",
      submitting: "Publishing...",

      footer: "Fan-made. Not officially affiliated.",

      cropTitle: "Crop image",
      cropSubtitle:
        "Horizontal/vertical + zoom + rotation. The output keeps the original resolution (no pixel limit).",
      horizontal: "Horizontal",
      vertical: "Vertical",
      rotate90: "Rotate 90°",
      zoom: "Zoom",
      rotationNow: "Current rotation:",
      useCrop: "Use crop",
      cancel: "Cancel",

      errNeedOfferWant: "Fill at least ‘Offering’ and ‘Looking for’.",
      errNeedImage: "Select an item image (screenshot).",
      errUploadFail: "Upload failed",
      errCreateFail: "Failed to create listing",
      errResponse: "Response",
      errTryAgain: "Something went wrong. Try again.",
      errCropFail: "Failed to crop the image.",

      previewAlt: "Preview",
    },

    // Listings
    listings: {
      badge: "⚡ screenshot + “offering / looking for” + Steam/Discord",
      title: "Trade feed",
      subtitle: "Filter, find, and deal directly through the contact. Clean and simple.",

      create: "Create listing",
      clear: "Clear filters",

      searchLabel: "Search",
      searchPh: "e.g. blueprint, mod, battery, medkit…",

      regionLabel: "Region",
      regionAll: "All",

      sortLabel: "Sort",
      sortNew: "Newest",
      sortExpiring: "Expiring first",

      showingPrefix: "Showing up to",
      showingMid: "of",
      showingSuffix: "results",
      apply: "Apply filters",

      popularTags: "Popular tags:",
      allTags: "All",

      emptyFilters: "Nothing matched those filters. Clear tag/region or try a different search.",

      imageAlt: "Item screenshot",
      pillPrint: "screenshot",

      createdAtTz: "",
      dash: "—",

      offer: "Offering",
      want: "Looking for",

      contactFallback: "contact in listing",
      noSteam: "no steam",
      steam: "Steam",

      expiresExpired: "expired",
      expiresIn: "expires in",
      day: "day",
      days: "days",
      hourShort: "h",
      minuteShort: "min",
      moments: "moments",

      autoExpireNote:
        "Listings expire and automatically disappear from the feed. Want to renew? Post again with an updated screenshot.",
    },

    // FAQ
    faq: {
      metaTitle: "FAQ | ARC Traders",
      metaDescription:
        "Frequently asked questions about listings, expiration, safety, and how trading works on ARC Traders.",

      badge: "quick answers, no pointless wall of text",
      title: "F.A.Q",
      subtitle: "Everything people ask before posting (and what saves you headaches later).",

      ctaPost: "Post now",
      ctaFeed: "View feed",

      open: "open",
      close: "close",

      generalTitle: "General",
      generalSubtitle: "What it is, what it isn’t, and why it exists.",

      postingTitle: "Posting listings",
      postingSubtitle: "How to make a listing that actually gets replies.",

      expirationTitle: "Expiration",
      expirationSubtitle: "To keep the feed alive and avoid stale listings.",

      safetyTitle: "Safety",

      privacyTitle: "Privacy",
      privacySubtitle: "What’s public and what you control.",

      issuesTitle: "Common problems",
      issuesSubtitle: "When something doesn’t show up or looks wrong.",

      g1q: "What is ARC Traders?",
      g1a:
        "A trade listing feed for ARC Raiders: you post a screenshot, write what you want in return, and leave a contact (Steam/Discord). The deal happens directly with you.",
      g2q: "Do I need an account?",
      g2a:
        "Not for now. The goal is speed: post it and it shows up. Later we might add accounts for history, favorites, and stronger moderation, but the MVP is zero bureaucracy.",
      g3q: "Are you officially part of ARC Raiders?",
      g3a:
        "No. This is a fan-made project with no affiliation to Embark/Nexon. The goal is to organize trades, not “represent” the game. Open source project.",

      p1q: "What do I need to post?",
      p1a:
        "Three things: an item screenshot, clear “Offering/Looking for” text, and Steam or Discord. If you miss those, your listing turns into a ghost.",
      p2q: "How do I make my screenshot look good in the feed?",
      p2a:
        "Use crop/zoom on the creation page. Simple rule: big item, small HUD. The clearer it is, the faster people DM you.",
      p3q: "What are tags for?",
      p3a:
        "They make search actually work. Example: “mod”, “rare”, “battery”, “medkit”, “BR”. Your listing becomes much easier to find.",
      p4q: "Can I post multiple items in one listing?",
      p4a:
        "You can, but be smart: if the screenshot becomes messy, nobody understands it. Best is 1 item per listing, or at most a well-explained bundle.",

      e1q: "How does expiration work (1, 3, 7 days)?",
      e1a:
        "You choose it when posting. When it ends, the listing disappears automatically. The idea is to avoid dead trades taking space.",
      e2q: "It expired. Did I lose everything?",
      e2a:
        "Just post again (and you can reuse the same screenshot). Expiration exists to keep the feed fresh, not to punish you.",

      s1q: "Is RMT allowed (real money, cash apps, selling)?",
      s1a: "Yes, but we’re not responsible for losses or scams.",
      s2q: "How do I avoid scams?",
      s2a:
        "Classic signs: weird links, too much urgency, or “send the item first”. If it smells like a scam, it usually is. Walk away.",
      s3q: "Can I report someone?",
      s3a:
        "For now it’s simple: don’t trade with them and, if it’s a scam, send us the listing link. We’ll add a proper report system later.",

      pr1q: "What becomes public in a listing?",
      pr1a:
        "The screenshot, your text, and whatever contact you choose (Steam/Discord). If you don’t want to expose something, don’t include it.",
      pr2q: "Do you store my data?",
      pr2a:
        "We only store what you submit in the listing. No login in the MVP, so there’s no full profile and no passwords stored.",

      i1q: "I posted but it didn’t show in the feed. Why?",
      i1a:
        "Usually: the listing already expired (wrong date), upload error, or an active filter (tag/region/search). Try opening the feed and clicking “Clear filters”.",
      i2q: "My screenshot looks stretched or cropped weird.",
      i2a:
        "The feed uses a 16:10 ratio. On the creation page, crop and adjust zoom so it fits. Then the card looks perfect.",

      shortcutsTitle: "Shortcuts",
      shGeneral: "General",
      shPosting: "Posting",
      shExpiration: "Expiration",
      shSafety: "Safety",
      shPrivacy: "Privacy",
      shIssues: "Issues",

      tipTitle: "Golden tip",
      tipBody:
        "A good listing gets replies: readable screenshot + clear description + easy contact. If it’s confusing, nobody messages you.",

      footer: "Fan-made. Not officially affiliated.",
    },
  },
} satisfies Record<Lang, Dict>;
