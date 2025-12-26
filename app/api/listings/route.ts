import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function computeExpiresAt(expiresIn?: string | null) {
  const now = new Date();
  const key = (expiresIn ?? "3d").toLowerCase();

  if (key === "5m") return new Date(now.getTime() + 5 * 60 * 1000);
  if (key === "1d") return new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
  if (key === "3d") return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  if (key === "7d") return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // fallback seguro
  return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const imageUrl = String(body.imageUrl ?? "").trim();
    const offerText = String(body.offerText ?? "").trim();
    const wantText = String(body.wantText ?? "").trim();

    const tagsRaw = String(body.tags ?? "").trim();
    const region = String(body.region ?? "").trim() || null;
    const availabilityNote = String(body.availabilityNote ?? "").trim() || null;

    const displayName = String(body.displayName ?? "").trim() || null;
    const steamProfileUrl = String(body.steamProfileUrl ?? "").trim() || null;
    const arcProfileUrl = String(body.arcProfileUrl ?? "").trim() || null;
    const discordHandle = String(body.discordHandle ?? "").trim() || null;

    if (!imageUrl) return NextResponse.json({ error: "imageUrl é obrigatório." }, { status: 400 });
    if (!offerText || !wantText)
      return NextResponse.json({ error: "Preencha 'Ofereço' e 'Quero'." }, { status: 400 });

    if (!steamProfileUrl && !discordHandle)
      return NextResponse.json({ error: "Coloca Steam ou Discord pra contato." }, { status: 400 });

    const existingUser =
      (steamProfileUrl ? await prisma.user.findFirst({ where: { steamProfileUrl } }) : null) ||
      (discordHandle ? await prisma.user.findFirst({ where: { discordHandle } }) : null);

    const user =
      existingUser ??
      (await prisma.user.create({
        data: { displayName, steamProfileUrl, arcProfileUrl, discordHandle },
      }));

    const tags = tagsRaw
      ? tagsRaw.split(",").map((t: string) => t.trim()).filter(Boolean).slice(0, 10)
      : [];

      const days = Number(body.expiresIn ?? 3);
if (![1, 3, 7].includes(days)) {
  return NextResponse.json({ error: "Expiração inválida (use 1, 3 ou 7 dias)." }, { status: 400 });
}
const now = new Date();

const listings = await prisma.listing.findMany({
  where: {
    // status: "ACTIVE", // se existir
    OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
  },
  orderBy: { createdAt: "desc" },
  take: 30,
  include: { user: true, tags: { include: { tag: true } } },
});

const expiresAt = computeExpiresAt(body.expiresIn);

    const listing = await prisma.listing.create({
      data: {
        imageUrl,
        offerText,
        wantText,
        region,
        expiresAt,
        availabilityNote,
        userId: user.id,
        tags: tags.length
          ? {
              create: await Promise.all(
                tags.map(async (name: string) => {
                  const slug = slugify(name);
                  const tag = await prisma.tag.upsert({
                    where: { slug },
                    create: { name, slug },
                    update: { name },
                  });
                  return { tagId: tag.id };
                })
              ),
            }
          : undefined,
      },
      include: { user: true, tags: { include: { tag: true } } },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Erro inesperado" }, { status: 500 });
  }
}
