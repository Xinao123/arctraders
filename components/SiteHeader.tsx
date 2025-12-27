import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07080c]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
            ⚡
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
  );
}
