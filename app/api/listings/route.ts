import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "JSON inválido" }, { status: 400 });

  const days = Number(body.expiresInDays ?? 3);
  if (![1, 3, 7].includes(days)) {
    return NextResponse.json({ error: "expiresInDays deve ser 1, 3 ou 7" }, { status: 400 });
  }

  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  // TODO: aqui mantém sua lógica atual de criar/achar o "user contato" se você já tem isso
  const created = await prisma.listing.create({
    data: {
      imageUrl: body.imageUrl,
      imageBucket: body.imageBucket ?? null,
      imagePath: body.imagePath ?? null,

      offerText: body.offerText,
      wantText: body.wantText,
      tagsText: body.tags ?? null,          // se você usa string (ajuste se usa tabela Tag)
      region: body.region ?? null,
      availabilityNote: body.availabilityNote ?? null,

      expiresAt,
      status: "ACTIVE",

      // se seu schema usa relação com User, mantém aqui sua lógica atual:
      // userId: ...
    },
  });

  return NextResponse.json({ ok: true, listing: created }, { status: 201 });
}
