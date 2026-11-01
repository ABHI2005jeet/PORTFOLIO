import { createElement } from "react";

export function createOgImage(eyebrow: string, title: string, caption: string) {
  const rootStyle = {
    width: "100%", height: "100%", display: "flex", flexDirection: "column" as const,
    justifyContent: "space-between", padding: "72px", background: "#090a0f", color: "#e9e7e2",
    fontFamily: "sans-serif", backgroundImage: "radial-gradient(ellipse at 78% 18%, #24254e, transparent 48%)",
  };
  return createElement("div", { style: rootStyle },
    createElement("div", { style: { display: "flex", color: "#8ca9d8", fontSize: 22, letterSpacing: "0.16em" } }, eyebrow),
    createElement("div", { style: { display: "flex", maxWidth: 1000, fontSize: 82, lineHeight: 1.06, letterSpacing: "-0.06em" } }, title),
    createElement("div", { style: { display: "flex", color: "#9a9caa", fontSize: 24 } }, caption),
  );
}
