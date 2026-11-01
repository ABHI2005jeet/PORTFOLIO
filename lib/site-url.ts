export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export function getSiteUrl() {
  return siteUrl;
}

export function absoluteUrl(path: string) {
  if (!siteUrl) return undefined;
  return new URL(path, siteUrl).toString();
}
