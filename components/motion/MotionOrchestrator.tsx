"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "./MotionProvider";
import styles from "./MotionOrchestrator.module.scss";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};
type MotionRuntime = typeof import("@/lib/motion/register");
type MotionContext = ReturnType<MotionRuntime["gsap"]["context"]>;
type MotionMedia = ReturnType<MotionRuntime["gsap"]["matchMedia"]>;

export function MotionOrchestrator({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const bootRef = useRef(false);
  const { enabled, ready } = useMotion();
  const [boot, setBoot] = useState(false);

  useEffect(() => {
    bootRef.current = boot;
  }, [boot]);

  useEffect(() => {
    if (!ready) return;
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reset = window.setTimeout(() => setBoot(false), 0);
      return () => window.clearTimeout(reset);
    }
    const begin = window.setTimeout(() => {
      try {
        if (window.sessionStorage.getItem("abhijeet-boot-seen")) return;
        window.sessionStorage.setItem("abhijeet-boot-seen", "1");
        setBoot(true);
      } catch {
        setBoot(false);
      }
    }, 0);
    return () => window.clearTimeout(begin);
  }, [enabled, ready]);

  useEffect(() => {
    const root = scope.current;
    if (!root || !ready || !enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let timeoutHandle: number | undefined;
    let idleHandle: number | undefined;
    let context: MotionContext | undefined;
    let media: MotionMedia | undefined;
    const idleWindow = window as IdleWindow;

    const initialize = async () => {
      try {
        const { registerMotion, gsap, ScrollTrigger } = await import("@/lib/motion/register");
        if (disposed) return;
        registerMotion();
        const refreshPage = () => { if (!disposed) ScrollTrigger.refresh(); };
        context = gsap.context(() => {
          media = gsap.matchMedia(root);
          media.add(
            {
              desktop: "(min-width: 800px) and (prefers-reduced-motion: no-preference)",
              mobile: "(max-width: 799px) and (prefers-reduced-motion: no-preference)",
              reduced: "(prefers-reduced-motion: reduce)",
            },
            (conditions) => {
              if (conditions.conditions?.reduced) return;
              const wordLift = conditions.conditions?.mobile ? 7 : 12;
              const master = gsap.timeline({
                onComplete: () => {
                  if (!disposed) setBoot(false);
                },
              });

              if (bootRef.current) {
                const counter = { value: 0 };
                master.set("[data-boot-panel]", { autoAlpha: 1 }, 0);
                master.to(counter, {
                  value: 100,
                  duration: 0.68,
                  ease: "none",
                  onUpdate: () => {
                    if (progress.current) progress.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
                  },
                }, 0);
                master.to("[data-boot-progress]", { scaleX: 1, duration: 0.68, ease: "none" }, 0);
                master.to("[data-boot-panel]", { autoAlpha: 0, duration: 0.2, ease: "power2.out" }, 0.72);
              }

              master.fromTo(
                "[data-hero-word]",
                { y: wordLift },
                { y: 0, duration: 0.48, stagger: 0.055, ease: "power3.out" },
                bootRef.current ? 0.68 : 0,
              );
              master.fromTo(
                "[data-hero-intro]",
                { y: 8 },
                { y: 0, duration: 0.48, stagger: 0.045, ease: "power3.out" },
                bootRef.current ? 0.75 : 0.12,
              );

              const headline = root.querySelector<HTMLElement>("[data-reveal-headline]");
              if (headline) {
                gsap.fromTo(headline, { y: 12 }, {
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                  scrollTrigger: { trigger: headline, start: "top 84%", once: true },
                });
              }
              return () => master.kill();
            },
          );
        }, root);

        void document.fonts?.ready.then(refreshPage);
        const images = Array.from(document.images).filter((image) => !image.complete);
        images.forEach((image) => {
          image.addEventListener("load", refreshPage, { once: true });
          image.addEventListener("error", refreshPage, { once: true });
        });
        window.addEventListener("load", refreshPage, { once: true });
        context.add(() => {
          images.forEach((image) => {
            image.removeEventListener("load", refreshPage);
            image.removeEventListener("error", refreshPage);
          });
          window.removeEventListener("load", refreshPage);
        });
      } catch {
        // The server-rendered page remains complete if the motion bundle cannot load.
      }
    };

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(() => { void initialize(); }, { timeout: 900 });
    } else {
      timeoutHandle = window.setTimeout(() => { void initialize(); }, 160);
    }

    return () => {
      disposed = true;
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      media?.revert();
      context?.revert();
    };
  }, [enabled, ready]);

  return (
    <div className={styles.motionRoot} ref={scope}>
      {boot && enabled && (
        <div className={styles.bootPanel} data-boot-panel role="status" aria-live="polite">
          <div className={styles.bootReadout}>
            <span className={styles.bootLabel}>Preparing the atmosphere</span>
            <span className={styles.bootValue}><span ref={progress}>000</span><small>%</small></span>
          </div>
          <div className={styles.bootTrack} aria-hidden="true"><span data-boot-progress /></div>
          <p>The page is ready. Bringing a little motion into view.</p>
        </div>
      )}
      {children}
    </div>
  );
}
