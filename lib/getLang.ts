import "server-only";
import { cookies, headers } from "next/headers";

export type Lang = "pt" | "en";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const c = cookieStore.get("arc_lang")?.value;
  if (c === "pt" || c === "en") return c;

  const headerStore = await headers();
  const country = headerStore.get("x-vercel-ip-country") || "";
  if (country === "BR") return "pt";
  if (country) return "en";

  const al = (headerStore.get("accept-language") || "").toLowerCase();
  return al.includes("pt") ? "pt" : "en";
}
