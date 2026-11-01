import { markdownForHome, markdownForProject, markdownForWork } from "@/lib/content";
import { publicProjects } from "@/content/projects";

export function generateStaticParams() {
  return [
    { path: ["index"] },
    { path: ["work"] },
    ...publicProjects.map((project) => ({ path: ["work", project.slug] })),
  ];
}

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (request.headers.get("x-portfolio-markdown") !== "1") {
    return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  const { path } = await params;
  const markdown = path.length === 1 && path[0] === "index"
    ? markdownForHome()
    : path.length === 1 && path[0] === "work"
      ? markdownForWork()
      : path.length === 2 && path[0] === "work"
        ? markdownForProject(path[1])
        : undefined;
  if (!markdown) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
}
