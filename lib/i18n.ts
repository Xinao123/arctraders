import type { Lang } from "@/lib/getLang";

type NewDict = {
  // Top
  badge: string;
  title: string;
  subtitle: string;
  backFeed: string;

  // Trade details
  detailsTitle: string;
  offerLabel: string;
  offerPh: string;
  wantLabel: string;
  wantPh: string;

  // Tags / region / expiration
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

  // Contact
  contactTitle: string;
  steamLabel: string;
  steamPh: string;
  discordLabel: string;
  discordPh: string;

  // Rules pills
  ruleRmt: string;
  ruleClear: string;

  // Image card
  imageTitle: string;
  imageSubtitle: string;
  choose: string;
  noImage: string;
  cropBtn: string;
  useOriginalBtn: string;

  // Submit
  submit: string;
  submitting: string;

  // Footer
  footer: string;

  // Crop modal
  cropTitle: string;
  cropSubtitle: string;
  horizontal: string;
  vertical: string;
  rotate90: string;
  zoom: string;
  rotationNow: string;
  useCrop: string;
  cancel: string;

  // Errors
  errNeedOfferWant: string;
  errNeedImage: string;
  errUploadFail: string;
  errCreateFail: string;
  errResponse: string;
  errTryAgain: string;
  errCropFail: string;

  // A11y
  previewAlt: string;
};

type Dict = {
  // Hero
  badge: string;
  title: string;
  subtitle: string;
  postNow: string;
  openFeed: string;

  // Stats
  total: string;
  totalHint: string;
  new24h: string;
  new24hHint: string;
  activeNow: string;
  activeNowHint: string;

  // Rules
  rulesTitle: string;
  rules1: string;
  rules2: string;
  rules3: string;

  // Trending
  trendingTitle: string;
  noTags1: string;
  noTags2: string;

  // Preview
  previewTitle: string;
  previewSubtitle: string;
  previewNewPrefix: string;
  previewNewSuffix: string;
  emptyPreview: string;
  viewAll: string;

  // Cards
  cardOffer: string;
  cardWant: string;
  discordAvailable: string;
  noContact: string;
  imageAlt: string;

  // How it works
  howTitle: string;
  howSubtitle: string;
  howCta: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Footer
  footer: string;

  // New listing page
  new: NewDict;
};

export const i18n = {
  pt: {
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
      discordPh: "ex: User#0000",

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
  },

  en: {
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

    new: {
      badge: "screenshot + offer + want + contact",
      title: "Create listing",
      subtitle: "Make it easy to match: readable screenshot + clear text + easy contact.",
      backFeed: "Back to feed",

      detailsTitle: "Trade details",
      offerLabel: "Offering",
      offerPh: "Ex: Battery pack, rare mod, blueprint…",
      wantLabel: "Looking for",
      wantPh: "Ex: medkit, specific mod, 1:1…",

      tagsLabel: "Tags (comma-separated)",
      tagsPh: "Ex: blueprint, mod, rare, BR, EU…",

      regionLabel: "Region (optional)",
      regionPh: "Ex: BR / SA / NA / EU…",

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
      discordPh: "ex: User#0000",

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
  },
} satisfies Record<Lang, Dict>;
