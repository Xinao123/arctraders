import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ExpiresKey = "5m" | "1d" | "3d" | "7d";

function computeExpiresAt(key: ExpiresKey) {
  const now = Date.now();
  switch (key) {
    case "5m":
      return new Date(now + 5 * 60 * 1000);
    case "1d":
      return new Date(now + 1 * 24 * 60 * 60 * 1000);
    case "3d":
      return new Date(now + 3 * 24 * 60 * 60 * 1000);
    case "7d":
      return new Date(now + 7 * 24 * 60 * 60 * 1000);
  }
}

function normalizeTagName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function pickExpiresIn(body: any): ExpiresKey | null {
  // novo: expiresIn: "5m" | "1d" | "3d" | "7d"
  if (typeof body?.expiresIn === "string") {
    const v = body.expiresIn.toLowerCase();
    if (v === "5m" || v === "1d" || v === "3d" || v === "7d") return v;
    return null;
  }

  // antigo: expiresInDays: 1 | 3 | 7
  const d = Number(body?.expiresInDays);
  if (d === 1) return "1d";
  if (d === 3) return "3d";
  if (d === 7) return "7d";

  // default (se não vier nada)
  return "3d";
}

function safeString(v: any) {
  return typeof v === "string" ? v.trim() : "";
}

export async function GET(req: Request) {
  try {
    // "delete automático" sem cron: limpou, abriu o feed, sumiu
    const now = new Date();
    await prisma.listing.deleteMany({ where: { expiresAt: { lte: now } } });

    const { searchParams } = new URL(req.url);

    const q = (searchParams.get("q") ?? "").trim();
    const region = (searchParams.get("region") ?? "").trim();
    const tag = (searchParams.get("tag") ?? "").trim();
    const sort = (searchParams.get("sort") ?? "new").trim(); // "new" | "expiring"

    const where: any = {
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    };

    if (region) where.region = { contains: region, mode: "insensitive" };

    if (tag) {
      where.tags = {
        some: { tag: { name: { equals: normalizeTagName(tag), mode: "insensitive" } } },
      };
    }

    if (q) {
      where.AND = where.AND ?? [];
      where.AND.push({
        OR: [
          { offerText: { contains: q, mode: "insensitive" } },
          { wantText: { contains: q, mode: "insensitive" } },
          { region: { contains: q, mode: "insensitive" } },
          {
            tags: {
              some: { tag: { name: { contains: normalizeTagName(q), mode: "insensitive" } } },
            },
          },
        ],
      });
    }

    const orderBy: Prisma.ListingOrderByWithRelationInput[] =
      sort === "expiring"
        ? [{ expiresAt: "asc" }, { createdAt: "desc" }]
        : [{ createdAt: "desc" }];

    const listings = await prisma.listing.findMany({
      where,
      orderBy,
      take: 30,
      include: {
        user: true,
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json({ listings });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Erro no GET /api/listings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido (esperava JSON)." }, { status: 400 });
  }

  const imageUrl = safeString(body.imageUrl);
  const offerText = safeString(body.offerText);
  const wantText = safeString(body.wantText);
  const region = safeString(body.region) || null;

  const steamProfileUrl = safeString(body.steamProfileUrl) || null;
  const discordHandle = safeString(body.discordHandle) || null;

  if (!imageUrl) return NextResponse.json({ error: "imageUrl é obrigatório." }, { status: 400 });
  if (!offerText) return NextResponse.json({ error: "offerText é obrigatório." }, { status: 400 });
  if (!wantText) return NextResponse.json({ error: "wantText é obrigatório." }, { status: 400 });

  // recomendo MUITO exigir 1 contato pra não virar anúncio fantasma
  if (!steamProfileUrl && !discordHandle) {
    return NextResponse.json(
      { error: "Informe pelo menos 1 contato (Steam ou Discord)." },
      { status: 400 }
    );
  }

  // aceita 5m/1d/3d/7d (e também o antigo 1/3/7)
  const expKey = pickExpiresIn(body);
  if (!expKey) {
    return NextResponse.json(
      { error: "Expiração inválida (use 5m, 1d, 3d ou 7d)." },
      { status: 400 }
    );
  }
  const expiresAt = computeExpiresAt(expKey);

  // tags
  const rawTags: string[] = Array.isArray(body.tags) ? body.tags : [];
  const tagNames = rawTags
    .map((t) => normalizeTagName(String(t)))
    .filter(Boolean)
    .slice(0, 20);

  try {
    const now = new Date();

    const result = await prisma.$transaction(async (tx) => {
      // delete automático sem cron (também no POST)
      await tx.listing.deleteMany({ where: { expiresAt: { lte: now } } });

      // cria um "user" leve (sem conta), só pra contato
      const user = await tx.user.create({
        data: {
          steamProfileUrl,
          discordHandle,
        },
      });

      const listing = await tx.listing.create({
        data: {
          imageUrl,
          offerText,
          wantText,
          region,
          expiresAt,
          userId: user.id,
        },
        include: {
          user: true,
          tags: { include: { tag: true } },
        },
      });

      if (tagNames.length) {
        const tags = await Promise.all(
          tagNames.map((name) =>
            tx.tag.upsert({
              where: { name },
              create: { name },
              update: {},
            })
          )
        );

        await tx.listingTag.createMany({
          data: tags.map((t) => ({ listingId: listing.id, tagId: t.id })),
          skipDuplicates: true,
        });
      }

      // re-fetch pra vir com tags preenchidas
      const full = await tx.listing.findUnique({
        where: { id: listing.id },
        include: {
          user: true,
          tags: { include: { tag: true } },
        },
      });

      return full;
    });

    return NextResponse.json({ listing: result }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Erro ao criar anúncio." },
      { status: 500 }
    );
  }
}
