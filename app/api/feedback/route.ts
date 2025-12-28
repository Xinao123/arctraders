import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function safeString(v: any) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido (esperava JSON)." }, { status: 400 });
  }

  const kindRaw = safeString(body.kind).toLowerCase();
  const kind = kindRaw === "bug" ? "BUG" : kindRaw === "suggestion" ? "SUGGESTION" : null;

  const message = safeString(body.message);
  const contact = safeString(body.contact) || null;
  const pageUrl = safeString(body.pageUrl) || null;
  const lang = safeString(body.lang) || null;

  if (!kind) return NextResponse.json({ error: "Tipo inválido." }, { status: 400 });

  if (message.length < 10) {
    return NextResponse.json({ error: "Escreva um pouco mais para a gente entender." }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "Mensagem muito longa." }, { status: 400 });
  }
  if (contact && contact.length > 200) {
    return NextResponse.json({ error: "Contato muito longo." }, { status: 400 });
  }
  if (pageUrl && pageUrl.length > 500) {
    return NextResponse.json({ error: "Link muito longo." }, { status: 400 });
  }

  try {
 
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await prisma.feedback.findFirst({
      where: {
        message,
        createdAt: { gte: tenMinAgo },
      },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ ok: true, duplicated: true });
    }

    await prisma.feedback.create({
      data: {
        kind,
        message,
        contact,
        pageUrl,
        lang,
        userAgent: req.headers.get("user-agent") ?? null,
        status: "OPEN",
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Erro ao salvar feedback." }, { status: 500 });
  }
}
