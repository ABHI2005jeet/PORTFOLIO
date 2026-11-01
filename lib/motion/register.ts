import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function registerMotion() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

export { gsap, ScrollTrigger, useGSAP };
