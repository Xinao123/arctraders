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
    badge: "Troque em 3 passos",
    title: "Publique seu item. Encontre alguém. Troque.",
    subtitle:
      "ARC Traders é um espaço para anunciar trocas do ARC Raiders: envie uma imagem do item, diga o que você oferece e o que procura, e informe um contato. Sem cadastro obrigatório.",
    postNow: "Criar anúncio",
    openFeed: "Ver anúncios",

    total: "Total de anúncios",
    totalHint: "tudo que já foi publicado",
    new24h: "Novos nas últimas 24 horas",
    new24hHint: "publicados recentemente",
    activeNow: "Disponíveis agora",
    activeNowHint: "aparecem na lista",

    rulesTitle: "Regras rápidas",
    rules1: "A imagem é obrigatória (ajuste para ficar legível).",
    rules2: "Descreva bem o que você oferece e o que procura.",
    rules3: "Combine tudo diretamente com a outra pessoa. O site não cobra taxas.",

    trendingTitle: "Palavras mais usadas",
    noTags1: "ainda não há palavras",
    noTags2: "publique um anúncio para começar",

    previewTitle: "Anúncios recentes",
    previewSubtitle: "trocas publicadas recentemente",
    previewNewPrefix: "Nas últimas 24 horas: ",
    previewNewSuffix: " novos",
    emptyPreview: "Ainda não há anúncios. Publique o primeiro.",
    viewAll: "Ver todos os anúncios",

    cardOffer: "Oferece",
    cardWant: "Procura",
    discordAvailable: "Discord informado",
    noContact: "sem contato",
    imageAlt: "Imagem do item",

    howTitle: "Como funciona",
    howSubtitle: "Simples e direto.",
    howCta: "Criar anúncio",
    step1Title: "Envie a imagem",
    step1Desc: "Use uma imagem que mostre bem o item.",
    step2Title: "Explique a troca",
    step2Desc: "Diga claramente o que você oferece e o que procura.",
    step3Title: "Deixe um contato",
    step3Desc: "Informe Steam, Discord ou outro contato para a pessoa falar com você.",

    footer: "Feito por fãs. Sem ligação oficial.",

    // New
    new: {
      badge: "imagem + oferta + pedido + contato",
      title: "Novo anúncio",
      subtitle: "Quanto mais claro e completo, mais fácil alguém entrar em contato.",
      backFeed: "Voltar para os anúncios",

      detailsTitle: "Informações da troca",
      offerLabel: "O que você oferece",
      offerPh: "Ex.: kit de bateria, melhoria rara, planta do item…",
      wantLabel: "O que você procura",
      wantPh: "Ex.: kit médico, melhoria específica, troca equivalente…",

      tagsLabel: "Palavras-chave (separe por vírgula)",
      tagsPh: "Ex.: melhoria, raro, bateria, kit médico, Brasil…",

      regionLabel: "Região (opcional)",
      regionPh: "Ex.: SA / NA / EU / OCE",

      expiresLabel: "Prazo do anúncio",
      expiresHint: "Depois desse prazo, o anúncio sai da lista automaticamente.",
      exp5m: "5 minutos (teste)",
      exp1d: "1 dia",
      exp3d: "3 dias",
      exp7d: "7 dias",

      contactTitle: "Como falar com você",
      steamLabel: "Steam (link do perfil)",
      steamPh: "https://steamcommunity.com/id/...",
      discordLabel: "Discord (opcional)",
      discordPh: "Ex.: Usuario#0000",

      ruleRmt: "Se combinar dinheiro real, faça por sua conta e risco",
      ruleClear: "Imagem bem legível ajuda muito",

      imageTitle: "Imagem do item",
      imageSubtitle: "Escolha uma imagem e ajuste para ficar boa na lista.",
      choose: "Escolher imagem",
      noImage: "Nenhuma imagem escolhida ainda.",
      cropBtn: "Ajustar imagem (deitado/em pé)",
      useOriginalBtn: "Usar a imagem sem ajuste",

      submit: "Publicar anúncio",
      submitting: "Publicando...",

      footer: "Feito por fãs. Sem ligação oficial.",

      cropTitle: "Ajustar imagem",
      cropSubtitle:
        "Escolha o formato (deitado/em pé), ajuste o tamanho e gire se precisar. A imagem final mantém boa qualidade.",
      horizontal: "Deitado",
      vertical: "Em pé",
      rotate90: "Girar 90°",
      zoom: "Tamanho",
      rotationNow: "Giro atual:",
      useCrop: "Usar este ajuste",
      cancel: "Cancelar",

      errNeedOfferWant: "Preencha o que você oferece e o que você procura.",
      errNeedImage: "Escolha uma imagem do item.",
      errUploadFail: "Não foi possível enviar a imagem.",
      errCreateFail: "Não foi possível criar o anúncio.",
      errResponse: "Resposta",
      errTryAgain: "Algo deu errado. Tente novamente.",
      errCropFail: "Não foi possível ajustar a imagem.",

      previewAlt: "Pré-visualização",
    },

    // Listings
    listings: {
      badge: "encontre e combine a troca",
      title: "Anúncios de troca",
      subtitle: "Pesquise e fale diretamente com quem publicou.",

      create: "Novo anúncio",
      clear: "Limpar busca",

      searchLabel: "Buscar",
      searchPh: "Ex.: bateria, melhoria, raro, kit médico…",

      regionLabel: "Região",
      regionAll: "Todas",

      sortLabel: "Ordenar",
      sortNew: "Mais recentes",
      sortExpiring: "Terminam primeiro",

      showingPrefix: "Mostrando até",
      showingMid: "de",
      showingSuffix: "resultados",
      apply: "Buscar",

      popularTags: "Palavras-chave populares:",
      allTags: "Todas",

      emptyFilters: "Não encontramos resultados. Tente mudar a região, as palavras ou a busca.",

      imageAlt: "Imagem do item",
     

      createdAtTz: "",
      dash: "—",

      offer: "Oferece",
      want: "Procura",

      contactFallback: "contato no anúncio",
      noSteam: "sem Steam",
      steam: "Steam",

      expiresExpired: "vencido",
      expiresIn: "termina em",
      day: "dia",
      days: "dias",
      hourShort: "h",
      minuteShort: "min",
      moments: "instantes",

      autoExpireNote:
        "Os anúncios saem da lista automaticamente quando o prazo termina. Se quiser renovar, publique novamente com uma imagem atualizada.",
    },

    // FAQ
    faq: {
      metaTitle: "Perguntas frequentes | ARC Traders",
      metaDescription:
        "Perguntas frequentes sobre anúncios, prazos, segurança e como funcionam as trocas no ARC Traders.",

      badge: "respostas diretas e fáceis",
      title: "Perguntas frequentes",
      subtitle: "O básico para entender o site e evitar problemas.",

      ctaPost: "Criar anúncio",
      ctaFeed: "Ver anúncios",

      open: "abrir",
      close: "fechar",

      generalTitle: "Geral",
      generalSubtitle: "O que é o site e qual é a ideia.",

      postingTitle: "Criando anúncios",
      postingSubtitle: "Como publicar de um jeito claro e fácil de entender.",

      expirationTitle: "Prazo do anúncio",
      expirationSubtitle: "Para manter os anúncios sempre atualizados.",

      safetyTitle: "Segurança",

      privacyTitle: "Privacidade",
      privacySubtitle: "O que fica público e o que você controla.",

      issuesTitle: "Problemas comuns",
      issuesSubtitle: "Quando algo não aparece ou a imagem fica estranha.",

      g1q: "O que é o ARC Traders?",
      g1a:
        "É um lugar para anunciar trocas do ARC Raiders. Você publica uma imagem do item, descreve o que oferece e o que procura, e informa um contato. A negociação acontece diretamente entre as pessoas.",
      g2q: "Precisa criar conta?",
      g2a:
        "No momento, não. A ideia é ser simples: você publica e o anúncio aparece. Mais pra frente, podemos criar contas para recursos como histórico, favoritos e moderação.",
      g3q: "Vocês são oficiais do ARC Raiders?",
      g3a:
        "Não. Este site foi feito por fãs e não tem ligação com a Embark ou a Nexon. A intenção é só ajudar a organizar as trocas. O projeto é compartilhado publicamente.",

      p1q: "O que eu preciso para publicar?",
      p1a:
        "O essencial é: uma imagem do item, uma descrição clara do que você oferece e do que você procura, e um contato (Steam ou Discord).",
      p2q: "Como deixar a imagem mais bonita na lista?",
      p2a:
        "Na página de criação, use o ajuste de imagem para aproximar e cortar o que não importa. A dica é simples: deixe o item bem visível e evite excesso de tela em volta.",
      p3q: "Para que servem as palavras-chave?",
      p3a:
        "Elas ajudam as pessoas a encontrarem seu anúncio na busca. Use palavras simples e diretas, como o nome do item, tipo de melhoria, raridade e região.",
      p4q: "Posso colocar mais de um item no mesmo anúncio?",
      p4a:
        "Pode, mas só se ficar fácil de entender. Se a imagem e o texto ficarem confusos, é melhor separar em anúncios diferentes.",

      e1q: "Como funciona o prazo (1, 3, 7 dias)?",
      e1a:
        "Você escolhe o prazo ao criar o anúncio. Quando o prazo termina, o anúncio sai da lista automaticamente.",
      e2q: "O prazo terminou. Eu perdi tudo?",
      e2a:
        "Não. Basta publicar novamente. Se quiser, você pode usar a mesma imagem e o mesmo texto.",

      s1q: "É permitido trocar por dinheiro real (Pix, venda)?",
      s1a:
        "Algumas pessoas podem combinar isso por conta própria, mas o site não oferece garantia e não se responsabiliza por perdas, golpes ou conflitos.",
      s2q: "Como evitar golpes?",
      s2a:
        "Desconfie de pressa excessiva, pedidos estranhos e links suspeitos. Se algo parecer errado, não continue a negociação.",
      s3q: "Dá para denunciar alguém?",
      s3a:
        "Ainda não existe um botão de denúncia. Se acontecer um golpe, não negocie com a pessoa e envie o link do anúncio para a gente. Vamos melhorar isso com o tempo.",

      pr1q: "O que fica público no anúncio?",
      pr1a:
        "A imagem, o texto e o contato que você escolher informar. Se você não quer mostrar algo, não inclua no anúncio.",
      pr2q: "Vocês guardam meus dados?",
      pr2a:
        "Guardamos apenas o que você envia no anúncio. Como ainda não existe login, não armazenamos senha nem perfil completo.",

      i1q: "Publiquei e não apareceu. Por quê?",
      i1a:
        "Normalmente é por causa de algum filtro ativo na busca (palavra, região) ou algum problema ao enviar a imagem. Tente limpar a busca e procurar novamente.",
      i2q: "Minha imagem ficou esticada ou cortada estranho.",
      i2a:
        "As imagens aparecem em um formato fixo. Na criação, use o ajuste de imagem para deixar o item centralizado e bem visível.",

      shortcutsTitle: "Atalhos",
      shGeneral: "Geral",
      shPosting: "Criando anúncios",
      shExpiration: "Prazo",
      shSafety: "Segurança",
      shPrivacy: "Privacidade",
      shIssues: "Problemas",

      tipTitle: "Dica importante",
      tipBody:
        "Um anúncio bom é fácil de entender: imagem nítida, descrição clara e contato simples. Se ficar confuso, as pessoas não entram em contato.",

      footer: "Feito por fãs. Sem ligação oficial.",
    },
  },

  en: {
    // Home
    badge: "Trade in 3 steps",
    title: "Share your item. Find someone. Trade.",
    subtitle:
      "ARC Traders is a place to share trade posts for ARC Raiders: add an image of your item, say what you offer and what you want, and leave a way to contact you. No required sign-up.",
    postNow: "Create a post",
    openFeed: "View posts",

    total: "Total posts",
    totalHint: "everything published so far",
    new24h: "New in the last 24 hours",
    new24hHint: "posted recently",
    activeNow: "Available now",
    activeNowHint: "shown in the list",

    rulesTitle: "Quick rules",
    rules1: "An image is required (adjust it so it’s easy to read).",
    rules2: "Describe clearly what you offer and what you want.",
    rules3: "Agree directly with the other person. The site does not charge fees.",

    trendingTitle: "Most used keywords",
    noTags1: "no keywords yet",
    noTags2: "create a post to start",

    previewTitle: "Recent posts",
    previewSubtitle: "trades published recently",
    previewNewPrefix: "Last 24 hours: ",
    previewNewSuffix: " new",
    emptyPreview: "No posts yet. Create the first one.",
    viewAll: "View all posts",

    cardOffer: "Offering",
    cardWant: "Looking for",
    discordAvailable: "Discord provided",
    noContact: "no contact",
    imageAlt: "Item image",

    howTitle: "How it works",
    howSubtitle: "Simple and direct.",
    howCta: "Create a post",
    step1Title: "Add the image",
    step1Desc: "Use an image that clearly shows the item.",
    step2Title: "Explain the trade",
    step2Desc: "Write clearly what you offer and what you want.",
    step3Title: "Leave a contact",
    step3Desc: "Share Steam, Discord, or another contact so people can reach you.",

    footer: "Made by fans. Not officially affiliated.",

    // New
    new: {
      badge: "image + offer + want + contact",
      title: "New post",
      subtitle: "The clearer and more complete it is, the easier it is to get messages.",
      backFeed: "Back to posts",

      detailsTitle: "Trade information",
      offerLabel: "What you offer",
      offerPh: "Example: battery kit, rare upgrade, item plan…",
      wantLabel: "What you want",
      wantPh: "Example: med kit, specific upgrade, equal trade…",

      tagsLabel: "Keywords (separate with commas)",
      tagsPh: "Example: upgrade, rare, battery, med kit, Brazil…",

      regionLabel: "Region (optional)",
      regionPh: "Example: SA  / NA / EU / OCE...",

      expiresLabel: "Post duration",
      expiresHint: "After this time, the post is removed from the list automatically.",
      exp5m: "5 minutes (test)",
      exp1d: "1 day",
      exp3d: "3 days",
      exp7d: "7 days",

      contactTitle: "How people can reach you",
      steamLabel: "Steam (profile link)",
      steamPh: "https://steamcommunity.com/id/...",
      discordLabel: "Discord (optional)",
      discordPh: "Example: User#0000",

      ruleRmt: "If you agree on real-money deals, it is at your own risk",
      ruleClear: "A clear image helps a lot",

      imageTitle: "Item image",
      imageSubtitle: "Choose an image and adjust it so it looks good in the list.",
      choose: "Choose image",
      noImage: "No image selected yet.",
      cropBtn: "Adjust image (wide/tall)",
      useOriginalBtn: "Use image without adjustments",

      submit: "Publish post",
      submitting: "Publishing...",

      footer: "Made by fans. Not officially affiliated.",

      cropTitle: "Adjust image",
      cropSubtitle:
        "Choose the shape (wide/tall), adjust the size, and rotate if needed. The final image keeps good quality.",
      horizontal: "Wide",
      vertical: "Tall",
      rotate90: "Rotate 90°",
      zoom: "Size",
      rotationNow: "Current rotation:",
      useCrop: "Use this adjustment",
      cancel: "Cancel",

      errNeedOfferWant: "Fill in what you offer and what you want.",
      errNeedImage: "Choose an image of the item.",
      errUploadFail: "We could not send the image.",
      errCreateFail: "We could not create the post.",
      errResponse: "Response",
      errTryAgain: "Something went wrong. Please try again.",
      errCropFail: "We could not adjust the image.",

      previewAlt: "Preview",
    },

    // Listings
    listings: {
      badge: "find a post and contact the person",
      title: "Trade posts",
      subtitle: "Search and talk directly to the person who posted.",

      create: "New post",
      clear: "Clear search",

      searchLabel: "Search",
      searchPh: "Example: battery, upgrade, rare, med kit…",

      regionLabel: "Region",
      regionAll: "All",

      sortLabel: "Sort",
      sortNew: "Newest",
      sortExpiring: "Ending first",

      showingPrefix: "Showing up to",
      showingMid: "of",
      showingSuffix: "results",
      apply: "Search",

      popularTags: "Popular keywords:",
      allTags: "All",

      emptyFilters: "No results found. Try changing the region, keywords, or search.",

      imageAlt: "Item image",
      pillPrint: "",

      createdAtTz: "",
      dash: "—",

      offer: "Offering",
      want: "Looking for",

      contactFallback: "contact in the post",
      noSteam: "no Steam",
      steam: "Steam",

      expiresExpired: "ended",
      expiresIn: "ends in",
      day: "day",
      days: "days",
      hourShort: "h",
      minuteShort: "min",
      moments: "moments",

      autoExpireNote:
        "Posts are removed automatically when the time ends. If you want to renew, publish again with an updated image.",
    },

    // FAQ
    faq: {
      metaTitle: "Frequently asked questions | ARC Traders",
      metaDescription:
        "Frequently asked questions about posts, duration, safety, and how trading works on ARC Traders.",

      badge: "simple answers",
      title: "Frequently asked questions",
      subtitle: "The basics to understand the site and avoid problems.",

      ctaPost: "Create a post",
      ctaFeed: "View posts",

      open: "open",
      close: "close",

      generalTitle: "General",
      generalSubtitle: "What the site is and what it’s for.",

      postingTitle: "Creating posts",
      postingSubtitle: "How to publish in a clear and easy way.",

      expirationTitle: "Post duration",
      expirationSubtitle: "To keep posts up to date.",

      safetyTitle: "Safety",

      privacyTitle: "Privacy",
      privacySubtitle: "What is public and what you control.",

      issuesTitle: "Common problems",
      issuesSubtitle: "When something doesn’t show up or the image looks wrong.",

      g1q: "What is ARC Traders?",
      g1a:
        "It’s a place to share trade posts for ARC Raiders. You add an image, describe what you offer and what you want, and leave a contact. The agreement happens directly between people.",
      g2q: "Do I need an account?",
      g2a:
        "Not right now. The idea is to keep it simple: you publish and the post appears. Later we may add accounts for features like history, favorites, and moderation.",
      g3q: "Are you officially part of ARC Raiders?",
      g3a:
        "No. This site is made by fans and has no connection to Embark or Nexon. The goal is only to help organize trades. The project is shared publicly.",

      p1q: "What do I need to publish?",
      p1a:
        "At minimum: an image of the item, a clear description of what you offer and what you want, and a contact (Steam or Discord).",
      p2q: "How do I make the image look better in the list?",
      p2a:
        "On the creation page, use the image adjustment to focus on the item and remove what doesn’t matter. Keep the item easy to see.",
      p3q: "What are keywords for?",
      p3a:
        "They help people find your post in search. Use simple words like the item name, upgrade type, rarity, and region.",
      p4q: "Can I include multiple items in one post?",
      p4a:
        "Yes, if it stays easy to understand. If the image or text becomes confusing, it’s better to split into separate posts.",

      e1q: "How does the duration work (1, 3, 7 days)?",
      e1a:
        "You choose the duration when creating the post. When time ends, the post is removed from the list automatically.",
      e2q: "The time ended. Did I lose everything?",
      e2a:
        "No. Just publish again. If you want, you can reuse the same image and text.",

      s1q: "Are real-money deals allowed (selling, cash apps)?",
      s1a:
        "Some people may agree on that privately, but the site provides no guarantees and is not responsible for losses, scams, or disputes.",
      s2q: "How do I avoid scams?",
      s2a:
        "Be careful with excessive urgency, strange requests, and suspicious links. If something feels wrong, stop the conversation.",
      s3q: "Can I report someone?",
      s3a:
        "There is no report button yet. If you face a scam, do not trade with the person and send us the post link. We will improve this over time.",

      pr1q: "What becomes public in a post?",
      pr1a:
        "The image, the text, and the contact you choose to share. If you don’t want something public, don’t include it.",
      pr2q: "Do you store my data?",
      pr2a:
        "We store only what you submit in the post. Since there is no login yet, we do not store passwords or full profiles.",

      i1q: "I published but it didn’t show up. Why?",
      i1a:
        "Usually it happens because a search filter is active (words, region) or there was an issue sending the image. Try clearing the search and checking again.",
      i2q: "My image looks stretched or oddly cut.",
      i2a:
        "Images are shown in a fixed shape. When creating the post, use the image adjustment so the item is centered and easy to see.",

      shortcutsTitle: "Shortcuts",
      shGeneral: "General",
      shPosting: "Creating posts",
      shExpiration: "Duration",
      shSafety: "Safety",
      shPrivacy: "Privacy",
      shIssues: "Problems",

      tipTitle: "Important tip",
      tipBody:
        "A good post is easy to understand: clear image, clear description, and simple contact. If it’s confusing, people won’t message you.",

      footer: "Made by fans. Not officially affiliated.",
    },
  },
} satisfies Record<Lang, Dict>;
