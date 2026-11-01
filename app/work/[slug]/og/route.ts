import { ImageResponse } from "next/og";
import { publicProjects } from "@/content/projects";
import { createOgImage } from "@/lib/og-image";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = publicProjects.find((entry) => entry.slug === slug);
  return new ImageResponse(createOgImage("PROJECT NOTE / ABHIJEET KUMAR", project?.title ?? "Selected work", "SOFTWARE · SECURITY · CLOUD · DEVOPS"), { width: 1200, height: 630 });
}
