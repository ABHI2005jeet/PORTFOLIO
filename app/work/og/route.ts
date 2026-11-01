import { ImageResponse } from "next/og";
import { createOgImage } from "@/lib/og-image";

export function GET() {
  return new ImageResponse(createOgImage("SELECTED WORK / ABHIJEET KUMAR", "A growing body of work.", "SOFTWARE · SECURITY · CLOUD · DEVOPS"), { width: 1200, height: 630 });
}
