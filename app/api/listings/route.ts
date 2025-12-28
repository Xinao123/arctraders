import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ExpiresKey = "5m" | "1d" | "3d" | "7d";

function safeString(v: any) {
  return typeof v === "string" ? v.trim() : "";
}

function normalizeTagName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function slugifyTag(name: string) {
  return normalizeTagName(name)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9 ]/g, "") 
    .trim()
    .replace(/\s+/g, "-");
}

function computeExpiresAt(key: ExpiresKey) {
  const now = Date.now();
  if (key === "5m") return new Date(now + 5 * 60 * 1000);
  if (key === "1d") return new Date(now + 1 * 24 * 60 * 60 * 1000);
  if (key === "3d") return new Date(now + 3 * 24 * 60 * 60 * 1000);
  return new Date(now + 7 * 24 * 60 * 60 * 1000);
}

function pickExpiresKey(body: any): ExpiresKey | null {
  
  if (typeof body?.expiresIn === "string") {
    const v = body.expiresIn.toLowerCase();
    if (v === "5m" || v === "1d" || v === "3d" || v === "7d") return v;
    return null;
  }

  
  const d = Number(body?.expiresInDays);
  if (d === 1) return "1d";
  if (d === 3) return "3d";
  if (d === 7) return "7d";

 
  return "3d";
}

async function ensureTag(tx: Prisma.TransactionClient, rawName: string) {
  const name = normalizeTagName(rawName);
  const slug = slugifyTag(name);


  const byName = await tx.tag.findUnique({ where: { name } });
  if (byName) return byName;


  const bySlug = await tx.tag.findUnique({ where: { slug } });
  if (bySlug) return bySlug;


  try {
    return await tx.tag.create({ data: { name, slug } });
  } catch (e: any) {
   
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const again =
        (await tx.tag.findUnique({ where: { name } })) ??
        (await tx.tag.findUnique({ where: { slug } }));
      if (again) return again;
    }
    throw e;
  }
}

export async function GET(req: Request) {
  try {
    const now = new Date();

    await prisma.listing.deleteMany({ where: { expiresAt: { lte: now } } });

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") ?? "").trim();
    const region = (searchParams.get("region") ?? "").trim();
    const tag = (searchParams.get("tag") ?? "").trim();
    const sort = (searchParams.get("sort") ?? "new").trim(); 

    const where: any = {
      status: "ACTIVE",
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    };

    if (region) where.region = { contains: region, mode: "insensitive" };

    if (tag) {
      const tagName = normalizeTagName(tag);
      const tagSlug = slugifyTag(tag);
      where.tags = {
        some: {
          tag: {
            OR: [
              { name: { equals: tagName, mode: "insensitive" } },
              { slug: { equals: tagSlug, mode: "insensitive" } },
            ],
          },
        },
      };
    }

    if (q) {
      const qName = normalizeTagName(q);
      const qSlug = slugifyTag(q);

      where.AND = where.AND ?? [];
      where.AND.push({
        OR: [
          { offerText: { contains: q, mode: "insensitive" } },
          { wantText: { contains: q, mode: "insensitive" } },
          { region: { contains: q, mode: "insensitive" } },
          {
            tags: {
              some: {
                tag: {
                  OR: [
                    { name: { contains: qName, mode: "insensitive" } },
                    { slug: { contains: qSlug, mode: "insensitive" } },
                  ],
                },
              },
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


  if (!steamProfileUrl && !discordHandle) {
    return NextResponse.json(
      { error: "Informe pelo menos 1 contato (Steam ou Discord)." },
      { status: 400 }
    );
  }

  const expKey = pickExpiresKey(body);
  if (!expKey) {
    return NextResponse.json(
      { error: "Expiração inválida (use 5m, 1d, 3d ou 7d)." },
      { status: 400 }
    );
  }
  const expiresAt = computeExpiresAt(expKey);

  const rawTags: string[] = Array.isArray(body.tags) ? body.tags : [];
  const tagsInput = rawTags
    .map((t) => normalizeTagName(String(t)))
    .filter(Boolean)
    .slice(0, 20);

  try {
    const now = new Date();

    const created = await prisma.$transaction(async (tx) => {
    
      await tx.listing.deleteMany({ where: { expiresAt: { lte: now } } });

      const or: any[] = [];
      if (steamProfileUrl) or.push({ steamProfileUrl });
      if (discordHandle) or.push({ discordHandle });

      let user = await tx.user.findFirst({
        where: or.length ? { OR: or } : undefined,
      });

      if (!user) {
        user = await tx.user.create({
          data: { steamProfileUrl, discordHandle },
        });
      }

      const listing = await tx.listing.create({
        data: {
          imageUrl,
          offerText,
          wantText,
          region,
          expiresAt,
          userId: user.id,
        },
      });

      if (tagsInput.length) {
        const tags = await Promise.all(tagsInput.map((n) => ensureTag(tx, n)));

        await tx.listingTag.createMany({
          data: tags.map((t) => ({ listingId: listing.id, tagId: t.id })),
          skipDuplicates: true,
        });
      }

      return tx.listing.findUnique({
        where: { id: listing.id },
        include: {
          user: true,
          tags: { include: { tag: true } },
        },
      });
    });

    return NextResponse.json({ listing: created }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Erro ao criar anúncio." },
      { status: 500 }
    );
  }
}
