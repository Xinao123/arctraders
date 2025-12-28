import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

 
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: `Content-Type inválido: ${contentType}` },
      { status: 400 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo não enviado (file)." }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
      ? "webp"
      : "jpg";

  const path = `listings/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

  const bucket = process.env.SUPABASE_BUCKET ?? "listing-prints";

  const { error: upErr } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);

  return NextResponse.json({
    publicUrl: data.publicUrl,
    path,
  });
}
