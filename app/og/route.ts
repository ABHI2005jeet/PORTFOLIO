import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { createOgImage } from "@/lib/og-image";

export function GET() {
  return new ImageResponse(createOgImage("SOFTWARE DEVELOPMENT · SECURITY · CLOUD", site.name, "PRE-FINAL-YEAR ENGINEERING STUDENT · AGRA, INDIA"), { width: 1200, height: 630 });
}
