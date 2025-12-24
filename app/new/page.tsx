"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Cropper, { Area } from "react-easy-crop";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type UploadInitResponse = {
  bucket: string;
  path: string;
  token: string;
  publicUrl: string;
};

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Recorta e redimensiona a imagem usando canvas.
 * Saída: Blob (JPG por padrão).
 */
async function cropAndResizeImage(params: {
  imageUrl: string;
  crop: Area;
  maxWidth: number;
  maxHeight: number;
  quality?: number; // 0..1
  mimeType?: string; // "image/jpeg" | "image/webp" | "image/png"
}): Promise<Blob> {
  const {
    imageUrl,
    crop,
    maxWidth,
    maxHeight,
    quality = 0.88,
    mimeType = "image/jpeg",
  } = params;

  const image = await createImage(imageUrl);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas não suportado.");

  // Primeiro: recorte (crop.width x crop.height)
  const cropW = Math.max(1, Math.round(crop.width));
  const cropH = Math.max(1, Math.round(crop.height));

  // Segundo: redimensiona respeitando maxWidth/maxHeight
  const scale = Math.min(maxWidth / cropW, maxHeight / cropH, 1);
  const outW = Math.max(1, Math.round(cropW * scale));
  const outH = Math.max(1, Math.round(cropH * scale));

  canvas.width = outW;
  canvas.height = outH;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    cropW,
    cropH,
    0,
    0,
    outW,
    outH
  );

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Falha ao gerar imagem."));
        else resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function NewListingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // arquivo original selecionado
  const [rawFile, setRawFile] = useState<File | null>(null);

  // preview da imagem selecionada (objectURL)
  const [rawPreviewUrl, setRawPreviewUrl] = useState<string | null>(null);

  // arquivo final (recortado + redimensionado)
  const [finalFile, setFinalFile] = useState<File | null>(null);

  // preview do arquivo final (objectURL)
  const [finalPreviewUrl, setFinalPreviewUrl] = useState<string | null>(null);

  // modal crop
  const [cropOpen, setCropOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const aspect = 16 / 10; // igual ao card

  // limpa objectURL antigo quando trocar
  useEffect(() => {
    return () => {
      if (rawPreviewUrl) URL.revokeObjectURL(rawPreviewUrl);
      if (finalPreviewUrl) URL.revokeObjectURL(finalPreviewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePickFile(file: File | null) {
    setError(null);

    if (!file) {
      setRawFile(null);
      setFinalFile(null);
      if (rawPreviewUrl) URL.revokeObjectURL(rawPreviewUrl);
      if (finalPreviewUrl) URL.revokeObjectURL(finalPreviewUrl);
      setRawPreviewUrl(null);
      setFinalPreviewUrl(null);
      return;
    }

    // Limite do arquivo original (antes do crop). Pode ser maior porque a gente vai reduzir.
    const maxRaw = 16 * 1024 * 1024; // 16MB
    if (file.size > maxRaw) {
      setError("Print grande demais. Tenta até 16MB ou salva como JPG/WEBP.");
      return;
    }

    setRawFile(file);

    if (rawPreviewUrl) URL.revokeObjectURL(rawPreviewUrl);
    const url = URL.createObjectURL(file);
    setRawPreviewUrl(url);

    // abre o editor
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropOpen(true);

    // reset final enquanto edita
    setFinalFile(null);
    if (finalPreviewUrl) URL.revokeObjectURL(finalPreviewUrl);
    setFinalPreviewUrl(null);
  }

  async function applyCrop() {
    if (!rawPreviewUrl || !croppedAreaPixels) {
      setError("Não consegui recortar. Tenta de novo.");
      return;
    }

    setError(null);

    // você pode ajustar isso:
    // 1600x1000 fica ótimo pro feed e não pesa
    const blob = await cropAndResizeImage({
      imageUrl: rawPreviewUrl,
      crop: croppedAreaPixels,
      maxWidth: 1600,
      maxHeight: 1000,
      quality: 0.88,
      mimeType: "image/jpeg",
    });

    const file = new File([blob], `listing-${Date.now()}.jpg`, {
      type: "image/jpeg",
    });

    setFinalFile(file);

    if (finalPreviewUrl) URL.revokeObjectURL(finalPreviewUrl);
    const url = URL.createObjectURL(file);
    setFinalPreviewUrl(url);

    setCropOpen(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const expiresInDays = Number(formData.get("expiresInDays") ?? 3);


    try {
      // Usa o arquivo final (recortado). Se o user não aplicou crop, usa o original mesmo.
      const fileToUpload = finalFile ?? (rawFile as File | null);

      if (!fileToUpload) {
        setError("Envie um print do item.");
        setLoading(false);
        return;
      }

      const offerText = String(formData.get("offerText") ?? "").trim();
      const wantText = String(formData.get("wantText") ?? "").trim();
      const steamProfileUrl = String(formData.get("steamProfileUrl") ?? "").trim();
      const discordHandle = String(formData.get("discordHandle") ?? "").trim();

      if (!offerText || !wantText) {
        setError("Preencha 'Ofereço' e 'Quero em troca'.");
        setLoading(false);
        return;
      }
      if (!steamProfileUrl && !discordHandle) {
        setError("Coloca pelo menos Steam ou Discord pra contato.");
        setLoading(false);
        return;
      }

      // 1) pede signed upload pro server
      const initRes = await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: fileToUpload.type || "image/jpeg" }),
      });

      const initContentType = initRes.headers.get("content-type") || "";
      const initBody = initContentType.includes("application/json")
        ? await initRes.json()
        : await initRes.text();

      if (!initRes.ok) {
        setError(
          typeof initBody === "string"
            ? initBody
            : initBody?.error ?? "Erro iniciando upload."
        );
        setLoading(false);
        return;
      }

      const { bucket, path, token, publicUrl } = initBody as UploadInitResponse;

      // 2) upload direto pro Supabase Storage
      const { error: uploadErr } = await supabaseBrowser.storage
        .from(bucket)
        .uploadToSignedUrl(path, token, fileToUpload, {
          contentType: fileToUpload.type || "image/jpeg",
        });

      if (uploadErr) {
        setError(uploadErr.message);
        setLoading(false);
        return;
      }

      // 3) cria listing no banco
      const payload = {
        imageUrl: publicUrl,
        offerText,
        wantText,
        tags: String(formData.get("tags") ?? "").trim(),
        region: String(formData.get("region") ?? "").trim(),
        availabilityNote: String(formData.get("availabilityNote") ?? "").trim(),
        expiresInDays,

        displayName: String(formData.get("displayName") ?? "").trim(),
        steamProfileUrl: steamProfileUrl || null,
        arcProfileUrl: String(formData.get("arcProfileUrl") ?? "").trim(),
        discordHandle: discordHandle || null,
      };

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      const body = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        setError(typeof body === "string" ? body : body?.error ?? "Erro criando anúncio.");
        setLoading(false);
        return;
      }

      router.push("/listings");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  const shownPreview = finalPreviewUrl ?? rawPreviewUrl;

  const fileInfo = useMemo(() => {
    const f = finalFile ?? rawFile;
    if (!f) return null;
    return {
      name: f.name,
      size: formatBytes(f.size),
      type: f.type || "—",
      optimized: !!finalFile,
    };
  }, [finalFile, rawFile]);

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Criar anúncio</h1>
            <p className="mt-2 text-sm text-white/70">
              Sobe o print, recorta bonitinho (opcional), e posta.
            </p>
          </div>

          <a
            href="/listings"
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Voltar
          </a>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Print */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">📷 Print do item</div>
              {fileInfo && (
                <div className="text-xs text-white/60">
                  {fileInfo.optimized ? "otimizado" : "original"} · {fileInfo.size}
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black"
              onChange={(e) => handlePickFile(e.target.files?.[0] ?? null)}
            />

            <div className="mt-2 text-xs text-white/50">
              Dica: recorta pra mostrar só o item. Fica mais “limpo” no feed.
            </div>

            {/* Preview */}
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-white/50">Preview</div>
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                  <div className="relative aspect-[16/10]">
                    {shownPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={shownPreview}
                        alt="Preview do print"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-sm text-white/40">
                        sem imagem ainda
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!rawPreviewUrl) {
                      setError("Escolhe um print primeiro 🙂");
                      return;
                    }
                    setError(null);
                    setCropOpen(true);
                  }}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  ✂️ Recortar / Zoom
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFinalFile(null);
                    if (finalPreviewUrl) URL.revokeObjectURL(finalPreviewUrl);
                    setFinalPreviewUrl(null);
                  }}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  ↩️ Voltar pro original
                </button>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-white/60">
                  <div className="font-semibold text-white/70">Por que isso ajuda?</div>
                  <div className="mt-1">
                    O feed fica padronizado (16:10) e o upload fica mais leve. Win-win.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Troca */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold">🔁 Troca</div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Ofereço</label>
                <input
                  name="offerText"
                  required
                  placeholder="Ex: Blueprint: Shock Module (Rare)"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Quero em troca</label>
                <input
                  name="wantText"
                  required
                  placeholder="Ex: Bateria Militar + 2x Medkit"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Tags (vírgula)</label>
                <input
                  name="tags"
                  placeholder="mod, rare, BR"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Região</label>
                <input
                  name="region"
                  placeholder="BR / SA / NA..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="mt-4">
  <label className="text-sm font-semibold">Expiração do anúncio</label>
  <select
    name="expiresInDays"
    defaultValue="3"
    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white"
  >
    <option value="1">1 dia</option>
    <option value="3">3 dias</option>
    <option value="7">7 dias</option>
  </select>
  <div className="mt-2 text-xs text-white/50">
    Depois disso o anúncio some do feed e é removido automaticamente.
  </div>
</div>


            <div className="mt-4">
              <label className="text-sm font-semibold">Disponibilidade</label>
              <input
                name="availabilityNote"
                placeholder="Ex: hoje 19-23h / fim de semana"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
              />
            </div>
          </section>

          {/* Contato */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold">👤 Contato</div>
            <p className="mt-2 text-xs text-white/50">
              Pelo menos Steam OU Discord, pra galera te achar.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Nome (opcional)</label>
                <input
                  name="displayName"
                  placeholder="Ex: Pedro"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Discord (opcional)</label>
                <input
                  name="discordHandle"
                  placeholder="Ex: pedro#0001"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">Steam Profile URL</label>
                <input
                  name="steamProfileUrl"
                  placeholder="https://steamcommunity.com/id/..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">Perfil ARC (opcional)</label>
                <input
                  name="arcProfileUrl"
                  placeholder="link do perfil"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>
          </section>

          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Postando..." : "Postar anúncio"}
            </button>

            <a
              href="/listings"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Cancelar
            </a>
          </div>
        </form>
      </div>

      {/* Modal Crop */}
      {cropOpen && rawPreviewUrl && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0b0d14] p-4">
            <div className="flex items-center justify-between px-2 py-2">
              <div>
                <div className="text-sm font-semibold">Recortar e ajustar</div>
                <div className="text-xs text-white/50">Arrasta pra enquadrar. Zoom pra dar foco no item.</div>
              </div>

              <button
                type="button"
                onClick={() => setCropOpen(false)}
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                Fechar
              </button>
            </div>

            <div className="relative mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="relative h-[58vh] min-h-[340px]">
                <Cropper
                  image={rawPreviewUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xs text-white/60">Zoom</div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-64"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCropOpen(false)}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={applyCrop}
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                >
                  Aplicar
                </button>
              </div>
            </div>

            <div className="mt-3 px-2 text-xs text-white/50">
              Saída: JPG otimizado (até 1600px). Feed agradece 🙏
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
