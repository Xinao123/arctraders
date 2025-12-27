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

  showingPrefix: string;
  showingMid: string;
  showingSuffix: string;
  apply: string;

  popularTags: string;
  allTags: string;

  emptyFilters: string;

  imageAlt: string;
  pillPrint: string;

  createdAtTz: string;
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
  metaTitle: string;
  metaDescription: string;

  badge: string;
  title: string;
  subtitle: string;

  ctaPost: string;
  ctaFeed: string;

  open: string;
  close: string;

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

  g1q: string;
  g1a: string;
  g2q: string;
  g2a: string;
  g3q: string;
  g3a: string;

  p1q: string;
  p1a: string;
  p2q: string;
  p2a: string;
  p3q: string;
  p3a: string;
  p4q: string;
  p4a: string;

  e1q: string;
  e1a: string;
  e2q: string;
  e2a: string;

  s1q: string;
  s1a: string;
  s2q: string;
  s2a: string;
  s3q: string;
  s3a: string;

  pr1q: string;
  pr1a: string;
  pr2q: string;
  pr2a: string;

  i1q: string;
  i1a: string;
  i2q: string;
  i2a: string;

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

  new: NewDict;
  listings: ListingsDict;
  faq: FAQDict;
};

export const i18n = {
  pt: {
    // Home
    badge: "Três passos para trocar",
    title: "Publique seu item. Encontre interessados. Feche a troca.",
    subtitle:
      "ARC Traders é um feed simples de trocas: envie um print do item, descreva o que você oferece e o que procura, e deixe um contato. Sem cadastro obrigatório.",
    postNow: "Publicar anúncio",
    openFeed: "Ver anúncios",

    total: "Total de anúncios",
    totalHint: "tudo o que já foi publicado",
    new24h: "Novos nas últimas 24h",
    new24hHint: "atividade recente",
    activeNow: "Ativos agora",
    activeNowHint: "visíveis no feed",

    rulesTitle: "Regras rápidas",
    rules1: "Print obrigatório (recorte/zoom para ficar legível).",
    rules2: "Descreva bem “Ofereço” e “Quero” para facilitar a busca.",
    rules3: "Negociação direta entre jogadores. Sem intermediários.",

    trendingTitle: "Tags em destaque",
    noTags1: "ainda sem tags",
    noTags2: "publique o primeiro anúncio",

    previewTitle: "Anúncios",
    previewSubtitle: "publicações mais recentes da comunidade",
    previewNewPrefix: "24h: ",
    previewNewSuffix: " novos",
    emptyPreview: "Ainda não há anúncios. Publique o primeiro.",
    viewAll: "Ver todos os anúncios",

    cardOffer: "Ofereço",
    cardWant: "Quero",
    discordAvailable: "Discord informado",
    noContact: "sem contato",
    imageAlt: "Print do item",

    howTitle: "Como funciona",
    howSubtitle: "Rápido e sem burocracia.",
    howCta: "Publicar troca",
    step1Title: "Envie o print",
    step1Desc: "Use um print nítido. Recorte e dê zoom para destacar o item.",
    step2Title: "Descreva a troca",
    step2Desc: "Explique claramente o que você oferece e o que procura.",
    step3Title: "Informe um contato",
    step3Desc: "Use Steam/Discord ou outro contato. A negociação acontece diretamente com você.",

    footer: "Projeto feito por fãs. Sem afiliação oficial.",

    // New
    new: {
      badge: "print + descrição + contato",
      title: "Criar anúncio",
      subtitle: "Um bom anúncio é simples: print claro, texto objetivo e um contato fácil.",
      backFeed: "Voltar ao feed",

      detailsTitle: "Detalhes da troca",
      offerLabel: "Ofereço",
      offerPh: "Ex.: Battery pack, mod raro, blueprint…",
      wantLabel: "Quero",
      wantPh: "Ex.: medkit, mod específico, troca 1:1…",

      tagsLabel: "Tags (separe por vírgula)",
      tagsPh: "Ex.: blueprint, mod, rare, BR, EU…",

      regionLabel: "Região (opcional)",
      regionPh: "Ex.: BR / SA / NA / EU…",

      expiresLabel: "Expiração",
      expiresHint: "Ao expirar, o anúncio sai do feed automaticamente.",
      exp5m: "5 minutos (teste)",
      exp1d: "1 dia",
      exp3d: "3 dias",
      exp7d: "7 dias",

      contactTitle: "Contato",
      steamLabel: "Steam (link do perfil)",
      steamPh: "https://steamcommunity.com/id/...",
      discordLabel: "Discord (opcional)",
      discordPh: "ex.: User#0000",

      ruleRmt: "Sem garantias para transações com dinheiro real",
      ruleClear: "Print nítido ajuda a receber respostas",

      imageTitle: "Imagem do item",
      imageSubtitle: "Selecione um print e recorte para ficar bem no feed.",
      choose: "Selecionar",
      noImage: "Nenhuma imagem selecionada. Escolha um print para começar.",
      cropBtn: "Recortar (H/V)",
      useOriginalBtn: "Usar original",

      submit: "Publicar anúncio",
      submitting: "Publicando...",

      footer: "Projeto feito por fãs. Sem afiliação oficial.",

      cropTitle: "Recortar imagem",
      cropSubtitle:
        "Ajuste orientação, zoom e rotação. O recorte mantém a resolução original (sem limitar pixels).",
      horizontal: "Horizontal",
      vertical: "Vertical",
      rotate90: "Girar 90°",
      zoom: "Zoom",
      rotationNow: "Rotação atual:",
      useCrop: "Usar recorte",
      cancel: "Cancelar",

      errNeedOfferWant: "Preencha pelo menos “Ofereço” e “Quero”.",
      errNeedImage: "Selecione uma imagem do item (print).",
      errUploadFail: "Falha no upload",
      errCreateFail: "Falha ao criar anúncio",
      errResponse: "Resposta",
      errTryAgain: "Algo deu errado. Tente novamente.",
      errCropFail: "Falha ao recortar a imagem.",

      previewAlt: "Pré-visualização",
    },

    // Listings
    listings: {
      badge: "print + oferta + contato",
      title: "Feed de trocas",
      subtitle: "Use filtros para encontrar anúncios e negocie diretamente com o anunciante.",

      create: "Criar anúncio",
      clear: "Limpar filtros",

      searchLabel: "Buscar",
      searchPh: "Ex.: blueprint, mod, bateria, medkit…",

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

      emptyFilters: "Nenhum anúncio encontrado com esses filtros. Tente ajustar a busca, região ou tag.",

      imageAlt: "Print do item",
      pillPrint: "print",

      createdAtTz: "",
      dash: "—",

      offer: "Ofereço",
      want: "Quero",

      contactFallback: "contato no anúncio",
      noSteam: "sem Steam",
      steam: "Steam",

      expiresExpired: "expirado",
      expiresIn: "expira em",
      day: "dia",
      days: "dias",
      hourShort: "h",
      minuteShort: "min",
      moments: "instantes",

      autoExpireNote:
        "Os anúncios expiram e saem do feed automaticamente. Para renovar, publique novamente com um print atualizado.",
    },

    // FAQ
    faq: {
      metaTitle: "FAQ | ARC Traders",
      metaDescription:
        "Dúvidas frequentes sobre anúncios, expiração, segurança e como funcionam as trocas no ARC Traders.",

      badge: "respostas diretas para dúvidas comuns",
      title: "Perguntas frequentes",
      subtitle: "Informações rápidas sobre anúncios, expiração, privacidade e segurança.",

      ctaPost: "Publicar anúncio",
      ctaFeed: "Ver feed",

      open: "abrir",
      close: "fechar",

      generalTitle: "Geral",
      generalSubtitle: "O que é o site e como ele se propõe a ajudar.",

      postingTitle: "Publicando anúncios",
      postingSubtitle: "Dicas para criar um anúncio claro e fácil de responder.",

      expirationTitle: "Expiração",
      expirationSubtitle: "Para manter o feed atualizado e evitar anúncios antigos.",

      safetyTitle: "Segurança",

      privacyTitle: "Privacidade",
      privacySubtitle: "O que fica público e o que você controla.",

      issuesTitle: "Problemas comuns",
      issuesSubtitle: "Quando algo não aparece ou não fica como você esperava.",

      g1q: "O que é o ARC Traders?",
      g1a:
        "Um feed de anúncios de troca para ARC Raiders. Você publica um print do item, descreve o que oferece e o que procura, e deixa um contato. A negociação é feita diretamente entre jogadores.",
      g2q: "Preciso criar conta?",
      g2a:
        "No momento, não. A proposta é manter o processo simples. Futuramente, podemos adicionar contas para recursos como favoritos, histórico e moderação.",
      g3q: "O ARC Traders é oficial?",
      g3a:
        "Não. É um projeto feito por fãs e não possui afiliação com a Embark/Nexon. O objetivo é organizar trocas da comunidade.",

      p1q: "O que preciso para publicar?",
      p1a:
        "Três coisas: um print do item, uma descrição clara em “Ofereço/Quero” e um contato (Steam ou Discord).",
      p2q: "Como deixar o print mais legível?",
      p2a:
        "Use o recorte e o zoom na página de criação. Quanto mais claro o item estiver, maior a chance de alguém entrar em contato.",
      p3q: "Para que servem as tags?",
      p3a:
        "Elas ajudam a busca. Use termos que descrevam o item ou a troca, como “mod”, “rare”, “battery”, “medkit”, “BR”.",
      p4q: "Posso colocar vários itens no mesmo anúncio?",
      p4a:
        "Pode, mas recomendamos evitar prints confusos. Quando possível, publique um item por anúncio ou um conjunto bem explicado.",

      e1q: "Como funciona a expiração (1, 3, 7 dias)?",
      e1a:
        "Você define a duração ao publicar. Quando expira, o anúncio deixa de aparecer no feed automaticamente.",
      e2q: "Meu anúncio expirou. O que faço?",
      e2a:
        "Basta publicar novamente. Se quiser, você pode reutilizar o mesmo print (ou atualizar).",

      s1q: "RMT (dinheiro real) é permitido?",
      s1a:
        "Pode acontecer entre usuários, mas o site não oferece garantia e não se responsabiliza por perdas, fraudes ou conflitos.",
      s2q: "Como evitar golpes?",
      s2a:
        "Evite links suspeitos, pedidos de urgência e propostas que exigem enviar itens primeiro. Se algo parecer estranho, não conclua a troca.",
      s3q: "Posso denunciar alguém?",
      s3a:
        "Por enquanto, não há um sistema interno de denúncias. Se houver problema, guarde o link do anúncio e nos envie para avaliarmos melhorias.",

      pr1q: "O que fica público no anúncio?",
      pr1a:
        "O print, o texto do anúncio e o contato que você inserir (Steam/Discord). Se não quiser expor algo, não inclua.",
      pr2q: "Vocês guardam meus dados?",
      pr2a:
        "Armazenamos apenas os dados do anúncio enviado. Sem login no MVP, não há senhas ou perfil completo.",

      i1q: "Publiquei e não apareceu no feed. Por quê?",
      i1a:
        "Verifique se o anúncio não expirou, se o upload foi concluído e se não há filtros ativos (tag/região/busca). Tente “Limpar filtros”.",
      i2q: "Meu print ficou esticado ou cortado estranho.",
      i2a:
        "O feed usa a proporção 16:10. Ajuste o recorte e o zoom na página de criação para encaixar melhor.",

      shortcutsTitle: "Atalhos",
      shGeneral: "Geral",
      shPosting: "Publicar",
      shExpiration: "Expiração",
      shSafety: "Segurança",
      shPrivacy: "Privacidade",
      shIssues: "Problemas",

      tipTitle: "Dica",
      tipBody:
        "Anúncios claros recebem mais respostas: print legível, descrição objetiva e um contato fácil de usar.",

      footer: "Projeto feito por fãs. Sem afiliação oficial.",
    },
  },

  en: {
    // Home
    badge: "Three steps to trade",
    title: "Post your item. Get responses. Complete the trade.",
    subtitle:
      "ARC Traders is a simple trade feed: upload an item screenshot, describe what you offer and what you want, and leave a contact. No required signup.",
    postNow: "Post a listing",
    openFeed: "View listings",

    total: "Total listings",
    totalHint: "everything ever posted",
    new24h: "New in the last 24h",
    new24hHint: "recent activity",
    activeNow: "Active now",
    activeNowHint: "visible in the feed",

    rulesTitle: "Quick rules",
    rules1: "A screenshot is required (crop/zoom so the item is readable).",
    rules2: "Write clear “Offering” and “Looking for” text to help people find you.",
    rules3: "Player-to-player negotiation. No middlemen.",

    trendingTitle: "Featured tags",
    noTags1: "no tags yet",
    noTags2: "post the first listing",

    previewTitle: "Listings",
    previewSubtitle: "latest posts from the community",
    previewNewPrefix: "24h: ",
    previewNewSuffix: " new",
    emptyPreview: "No listings yet. Post the first one.",
    viewAll: "View all listings",

    cardOffer: "Offering",
    cardWant: "Looking for",
    discordAvailable: "Discord provided",
    noContact: "no contact",
    imageAlt: "Item screenshot",

    howTitle: "How it works",
    howSubtitle: "Fast and straightforward.",
    howCta: "Post a trade",
    step1Title: "Upload a screenshot",
    step1Desc: "Use a clear screenshot. Crop and zoom to highlight the item.",
    step2Title: "Describe the trade",
    step2Desc: "Explain what you offer and what you want as clearly as possible.",
    step3Title: "Add a contact",
    step3Desc: "Use Steam/Discord or another contact. The conversation happens directly with you.",

    footer: "Fan-made project. Not officially affiliated.",

    // New
    new: {
      badge: "screenshot + details + contact",
      title: "Create listing",
      subtitle: "A good listing is simple: clear screenshot, clear text, easy contact.",
      backFeed: "Back to feed",

      detailsTitle: "Trade details",
      offerLabel: "Offering",
      offerPh: "e.g. Battery pack, rare mod, blueprint…",
      wantLabel: "Looking for",
      wantPh: "e.g. medkit, specific mod, 1:1 trade…",

      tagsLabel: "Tags (comma-separated)",
      tagsPh: "e.g. blueprint, mod, rare, BR, EU…",

      regionLabel: "Region (optional)",
      regionPh: "e.g. BR / SA / NA / EU…",

      expiresLabel: "Expiration",
      expiresHint: "After it expires, the listing is automatically removed from the feed.",
      exp5m: "5 minutes (test)",
      exp1d: "1 day",
      exp3d: "3 days",
      exp7d: "7 days",

      contactTitle: "Contact",
      steamLabel: "Steam (profile link)",
      steamPh: "https://steamcommunity.com/id/...",
      discordLabel: "Discord (optional)",
      discordPh: "e.g. User#0000",

      ruleRmt: "No guarantees for real-money deals",
      ruleClear: "Clear screenshots get more replies",

      imageTitle: "Item image",
      imageSubtitle: "Select a screenshot and crop it to fit nicely in the feed.",
      choose: "Select",
      noImage: "No image selected. Choose a screenshot to start.",
      cropBtn: "Crop (H/V)",
      useOriginalBtn: "Use original",

      submit: "Publish listing",
      submitting: "Publishing...",

      footer: "Fan-made project. Not officially affiliated.",

      cropTitle: "Crop image",
      cropSubtitle:
        "Adjust orientation, zoom, and rotation. Output keeps the original resolution (no pixel limit).",
      horizontal: "Horizontal",
      vertical: "Vertical",
      rotate90: "Rotate 90°",
      zoom: "Zoom",
      rotationNow: "Current rotation:",
      useCrop: "Use crop",
      cancel: "Cancel",

      errNeedOfferWant: "Fill in at least “Offering” and “Looking for”.",
      errNeedImage: "Select an item image (screenshot).",
      errUploadFail: "Upload failed",
      errCreateFail: "Failed to create listing",
      errResponse: "Response",
      errTryAgain: "Something went wrong. Please try again.",
      errCropFail: "Failed to crop the image.",

      previewAlt: "Preview",
    },

    // Listings
    listings: {
      badge: "screenshot + details + contact",
      title: "Trade feed",
      subtitle: "Use filters to find listings and contact the poster directly.",

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

      emptyFilters: "No listings matched those filters. Try adjusting your search, region, or tag.",

      imageAlt: "Item screenshot",
      pillPrint: "screenshot",

      createdAtTz: "",
      dash: "—",

      offer: "Offering",
      want: "Looking for",

      contactFallback: "contact in listing",
      noSteam: "no Steam",
      steam: "Steam",

      expiresExpired: "expired",
      expiresIn: "expires in",
      day: "day",
      days: "days",
      hourShort: "h",
      minuteShort: "min",
      moments: "moments",

      autoExpireNote:
        "Listings expire and are removed from the feed automatically. To renew, post again with an updated screenshot.",
    },

    // FAQ
    faq: {
      metaTitle: "FAQ | ARC Traders",
      metaDescription:
        "Frequently asked questions about listings, expiration, safety, privacy, and how trading works on ARC Traders.",

      badge: "clear answers to common questions",
      title: "Frequently asked questions",
      subtitle: "Quick information about posting, expiration, privacy, and safety.",

      ctaPost: "Post a listing",
      ctaFeed: "View feed",

      open: "open",
      close: "close",

      generalTitle: "General",
      generalSubtitle: "What the site is and what it aims to do.",

      postingTitle: "Posting listings",
      postingSubtitle: "Tips to make your listing clear and easy to reply to.",

      expirationTitle: "Expiration",
      expirationSubtitle: "To keep the feed current and avoid stale listings.",

      safetyTitle: "Safety",

      privacyTitle: "Privacy",
      privacySubtitle: "What’s public and what you control.",

      issuesTitle: "Common issues",
      issuesSubtitle: "When something doesn’t show up or doesn’t look right.",

      g1q: "What is ARC Traders?",
      g1a:
        "A trade listing feed for ARC Raiders. You upload a screenshot, describe what you offer and what you want, and leave a contact. Negotiation happens directly between players.",
      g2q: "Do I need an account?",
      g2a:
        "Not at the moment. The goal is to keep things simple. In the future, we may add accounts for features like favorites, history, and moderation.",
      g3q: "Is ARC Traders official?",
      g3a:
        "No. It’s a fan-made project and is not affiliated with Embark/Nexon. The goal is to help the community organize trades.",

      p1q: "What do I need to post?",
      p1a:
        "Three things: an item screenshot, clear “Offering/Looking for” text, and a contact (Steam or Discord).",
      p2q: "How can I make my screenshot more readable?",
      p2a:
        "Use crop and zoom on the creation page. The clearer the item is, the more likely someone will contact you.",
      p3q: "What are tags for?",
      p3a:
        "They improve search. Use terms that describe the item or trade, such as “mod”, “rare”, “battery”, “medkit”, “BR”.",
      p4q: "Can I include multiple items in one listing?",
      p4a:
        "You can, but avoid cluttered screenshots. When possible, post one item per listing or a well-explained bundle.",

      e1q: "How does expiration work (1, 3, 7 days)?",
      e1a:
        "You set the duration when posting. After it expires, the listing is automatically removed from the feed.",
      e2q: "My listing expired. What now?",
      e2a:
        "Just post again. You can reuse the same screenshot or upload an updated one.",

      s1q: "Is real-money trading allowed?",
      s1a:
        "Users may choose to do it, but the site provides no guarantees and is not responsible for losses, fraud, or disputes.",
      s2q: "How do I avoid scams?",
      s2a:
        "Avoid suspicious links, high-pressure requests, and deals that require sending items first. If it feels off, don’t proceed.",
      s3q: "Can I report someone?",
      s3a:
        "There is no built-in reporting system yet. If there’s an issue, keep the listing link and send it to us so we can improve moderation tools.",

      pr1q: "What is public in a listing?",
      pr1a:
        "The screenshot, the listing text, and the contact details you provide (Steam/Discord). If you don’t want to share something, don’t include it.",
      pr2q: "Do you store my data?",
      pr2a:
        "We store only what you submit in the listing. With no login in the MVP, there are no passwords or full profiles.",

      i1q: "I posted but it didn’t show in the feed. Why?",
      i1a:
        "Check if the listing expired, if the upload completed, and whether filters are active (tag/region/search). Try clicking “Clear filters”.",
      i2q: "My screenshot looks stretched or oddly cropped.",
      i2a:
        "The feed uses a 16:10 ratio. Adjust crop and zoom on the creation page for a better fit.",

      shortcutsTitle: "Shortcuts",
      shGeneral: "General",
      shPosting: "Posting",
      shExpiration: "Expiration",
      shSafety: "Safety",
      shPrivacy: "Privacy",
      shIssues: "Issues",

      tipTitle: "Tip",
      tipBody:
        "Clear listings get more replies: readable screenshot, straightforward description, and an easy contact method.",

      footer: "Fan-made project. Not officially affiliated.",
    },
  },
} satisfies Record<Lang, Dict>;
