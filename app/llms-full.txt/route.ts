import { llmsText } from "@/lib/content";

export function GET() {
  return new Response(llmsText(true), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}
