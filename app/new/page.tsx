"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Cropper from "react-easy-crop";

type PixelCrop = { x: number; y: number; width: number; height: number };

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function getRadianAngle(deg: number) {
  return (deg * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

// ✅ Sem limite de pixel: canvas final = tamanho exato do recorte.
// ✅ Com rotação: primeiro desenha a imagem girada num canvas “safe”, depois recorta.
async function cropToFile(
  imageSrc: string,
  crop: PixelCrop,
  rotationDeg = 0,
  filename = "crop.jpg",
  mime: "image/jpeg" | "image/png" | "image/webp" = "image/jpeg",
  quality = 0.92
): Promise<File> {
  const image = await createImage(imageSrc);

  const rotRad = getRadianAngle(rotationDeg);

  // canvas “safe” com a imagem rotacionada inteira
  const safeCanvas = document.createElement("canvas");
  const safeCtx = safeCanvas.getContext("2d");
  if (!safeCtx) throw new Error("Canvas ctx não disponível.");

  const { width: bW, height: bH } = rotateSize(image.width, image.height, rotationDeg);
  safeCanvas.width = Math.ceil(bW);
  safeCanvas.height = Math.ceil(bH);

  safeCtx.translate(safeCanvas.width / 2, safeCanvas.height / 2);
  safeCtx.rotate(rotRad);
  safeCtx.translate(-image.width / 2, -image.height / 2);
  safeCtx.drawImage(image, 0, 0);

  // canvas final: exatamente o tamanho do recorte
  const outCanvas = document.createElement("canvas");
  const outCtx = outCanvas.getContext("2d");
  if (!outCtx) throw new Error("Canvas ctx não disponível.");

  const w = Math.max(1, Math.round(crop.width));
  const h = Math.max(1, Math.round(crop.height));
  outCanvas.width = w;
  outCanvas.height = h;

  outCtx.drawImage(
    safeCanvas,
    Math.round(crop.x),
    Math.round(crop.y),
    w,
    h,
    0,
    0,
    w,
    h
  );

  const blob: Blob = await new Promise((resolve, reject) => {
    outCanvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Falha ao gerar blob do recorte."))),
      mime,
      quality
    );
  });

  return new File([blob], filename, { type: mime });
}

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, json: JSON.parse(text), raw: text };
  } catch {
    return { ok: res.ok, status: res.status, json: null as any, raw: text };
  }
}

export default function NewListingPage() {
  const router = useRouter();

  // Form fields
  const [offerText, setOfferText] = useState("");
  const [wantText, setWantText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [region, setRegion] = useState("");
  const [steamProfileUrl, setSteamProfileUrl] = useState("");
  const [discordHandle, setDiscordHandle] = useState("");
  const [expiresIn, setExpiresIn] = useState<"5m" | "1d" | "3d" | "7d">("3d");

  // Upload / status
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Image state
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);

  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);

  // Crop modal
  const [rawSrc, setRawSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [cropMode, setCropMode] = useState<"horizontal" | "vertical">("horizontal");
  const aspect = useMemo(() => (cropMode === "horizontal" ? 16 / 10 : 10 / 16), [cropMode]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // ✅ rotação em graus (0/90/180/270)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // cleanup object URLs
  useEffect(() => {
    return () => {
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (croppedPreview) URL.revokeObjectURL(croppedPreview);
      if (rawSrc) URL.revokeObjectURL(rawSrc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPickFile(file: File) {
    setError(null);

    if (originalPreview) URL.revokeObjectURL(originalPreview);
    if (croppedPreview) URL.revokeObjectURL(croppedPreview);
    if (rawSrc) URL.revokeObjectURL(rawSrc);

    const url = URL.createObjectURL(file);
    setOriginalFile(file);
    setOriginalPreview(url);

    setCroppedFile(null);
    setCroppedPreview(null);

    setRawSrc(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setCropMode("horizontal");
    setIsCropping(true);
  }

  function splitTags(text: string) {
    return text
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!offerText.trim() || !wantText.trim()) {
      setError("Preenche pelo menos ‘Ofereço’ e ‘Quero’.");
      return;
    }

    const fileToUpload = croppedFile ?? originalFile;
    if (!fileToUpload) {
      setError("Selecione uma imagem do item (print).");
      return;
    }

    const tags = splitTags(tagsText);

    setSubmitting(true);
    try {
      // 1) upload image
      const fd = new FormData();
      fd.append("file", fileToUpload);

      const uploadRes = await fetch("/api/uploads", { method: "POST", body: fd });
      const up = await safeJson(uploadRes);

      if (!up.ok) {
        throw new Error(
          up.json?.error ??
            `Falha no upload (${up.status}). Resposta: ${up.raw?.slice(0, 140) ?? "sem conteúdo"}`
        );
      }

      const imageUrl =
        up.json?.publicUrl ?? up.json?.url ?? up.json?.imageUrl ?? up.json?.data?.publicUrl;

      if (!imageUrl) throw new Error("Upload ok, mas não veio publicUrl/url na resposta.");

      // 2) create listing
      const listingRes = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          offerText: offerText.trim(),
          wantText: wantText.trim(),
          region: region.trim() || null,
          tags,
          steamProfileUrl: steamProfileUrl.trim() || null,
          discordHandle: discordHandle.trim() || null,
          expiresIn,
        }),
      });

      const li = await safeJson(listingRes);
      if (!li.ok) {
        throw new Error(
          li.json?.error ??
            `Falha ao criar anúncio (${li.status}). Resposta: ${li.raw?.slice(0, 140) ?? "sem conteúdo"}`
        );
      }

      router.push("/listings");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Deu ruim. Tenta de novo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07080c] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,255,255,0.12),rgba(7,8,12,0))]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07080c]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
              🧠
            </span>
            <span className="font-semibold tracking-tight">ARC Traders</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              Início
            </Link>
            <Link
              href="/listings"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              Feed
            </Link>
            <Link
              href="/faq"
              className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              FAQ
            </Link>
            <Link
              href="/new"
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Postar troca
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>🧾 print + oferta + troca + contato</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Criar anúncio</h1>
            <p className="mt-2 text-sm text-white/70">
              Faz um anúncio que dá match: print legível + texto objetivo + contato fácil.
            </p>
          </div>

          <Link
            href="/listings"
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Voltar pro feed
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
          {/* Left */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-sm font-semibold">Detalhes da troca</div>

            <div className="mt-4 grid gap-4">
              <div>
                <label className="text-xs font-semibold text-white/70">Ofereço</label>
                <input
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                  placeholder="Ex: Battery pack, mod raro, blueprint…"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70">Quero</label>
                <input
                  value={wantText}
                  onChange={(e) => setWantText(e.target.value)}
                  placeholder="Ex: medkit, mod específico, troca 1:1…"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70">Tags (separa por vírgula)</label>
                <input
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="Ex: blueprint, mod, rare, BR, EU…"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {splitTags(tagsText).slice(0, 10).map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-white/70">Região (opcional)</label>
                  <input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Ex: BR / SA / NA / EU…"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70">Expiração</label>
              <select
  value={expiresIn}
  onChange={(e) => setExpiresIn(e.target.value as "5m" | "1d" | "3d" | "7d")}
  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white"
>
  <option value="5m">5 minutos (teste)</option>
  <option value="1d">1 dia</option>
  <option value="3d">3 dias</option>
  <option value="7d">7 dias</option>  
  </select>

                  <div className="mt-2 text-xs text-white/50">
                    Quando expirar, o anúncio some do feed automaticamente.
                  </div>
                </div>
              </div>

              <div className="mt-2 text-sm font-semibold">Contato</div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-white/70">Steam (link do perfil)</label>
                  <input
                    value={steamProfileUrl}
                    onChange={(e) => setSteamProfileUrl(e.target.value)}
                    placeholder="https://steamcommunity.com/id/..."
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70">Discord (opcional)</label>
                  <input
                    value={discordHandle}
                    onChange={(e) => setDiscordHandle(e.target.value)}
                    placeholder="ex: yas#0001"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
                <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  ✅ Sem dinheiro real (RMT)
                </span>
                <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  ✅ Print claro = mais chance de fechar
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Imagem do item</div>
                <div className="mt-1 text-xs text-white/60">
                  Selecione um print e recorte pra ficar bonito no feed.
                </div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
              >
                Escolher
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  onPickFile(file);
                }}
              />
            </div>

            <div className="mt-4">
              {croppedPreview || originalPreview ? (
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <div className="aspect-[16/10]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={croppedPreview ?? originalPreview!}
                    alt="Preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 text-sm text-white/60">
                  Sem imagem ainda. Escolhe um print pra começar.
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!originalPreview}
                onClick={() => {
                  if (!originalPreview) return;
                  setRawSrc(originalPreview);
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                  setRotation(0);
                  setCroppedAreaPixels(null);
                  setIsCropping(true);
                }}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-40"
              >
                Recortar (H/V)
              </button>

              <button
                type="button"
                disabled={!croppedPreview}
                onClick={() => {
                  if (croppedPreview) URL.revokeObjectURL(croppedPreview);
                  setCroppedPreview(null);
                  setCroppedFile(null);
                }}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-40"
              >
                Usar original
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Postando..." : "Publicar anúncio"}
            </button>

            <div className="mt-4 text-xs text-white/55">
              Fan-made, sem afiliação oficial. Se pedirem Pix, “reserva” ou link estranho: block e tchau. 🤝
            </div>
          </div>
        </form>
      </div>

      {/* Crop Modal */}
      {isCropping && rawSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0a0b10] p-4 shadow-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-base font-semibold">Recortar imagem</div>
                <div className="text-xs text-white/60">
                  Horizontal/vertical + zoom + rotação. O recorte sai na resolução original (sem limitar pixels).
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCropMode("horizontal")}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                    cropMode === "horizontal"
                      ? "border-white/25 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Horizontal
                </button>
                <button
                  type="button"
                  onClick={() => setCropMode("vertical")}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                    cropMode === "vertical"
                      ? "border-white/25 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Vertical
                </button>

                {/* ✅ Botão girar 90° */}
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
                  title="Girar 90°"
                >
                  ↻ Girar 90°
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <div className="aspect-[16/10] w-full" />
                <Cropper
                  image={rawSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels as PixelCrop)}
                  objectFit="contain"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Zoom</div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="mt-3 w-full"
                />

                <div className="mt-4 text-xs text-white/60">
                  Rotação atual: <span className="text-white/80">{rotation}°</span>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        if (!croppedAreaPixels) return;

                        const file = await cropToFile(
                          rawSrc,
                          croppedAreaPixels,
                          rotation,
                          `arc-traders-${Date.now()}.jpg`,
                          "image/jpeg",
                          0.92
                        );

                        if (croppedPreview) URL.revokeObjectURL(croppedPreview);

                        const preview = URL.createObjectURL(file);
                        setCroppedFile(file);
                        setCroppedPreview(preview);

                        setIsCropping(false);
                      } catch (e: any) {
                        setError(e?.message ?? "Falha ao recortar.");
                        setIsCropping(false);
                      }
                    }}
                    className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Usar recorte
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCropping(false)}
                    className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="mt-4 text-[11px] text-white/45">
                  Obs: sem limite de pixel = se o print for 4K e o recorte grande, o arquivo pode ficar pesado.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
