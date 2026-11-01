"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

type MotionContextValue = {
  enabled: boolean;
  ready: boolean;
  setEnabled: (enabled: boolean) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

function shouldDefaultToMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 799px)").matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !reduced && !mobile && !connection?.saveData;
}

const listeners = new Set<() => void>();
function notifyMotionChange() { listeners.forEach((listener) => listener()); }
function getMotionSnapshot() {
  try {
    const stored = window.localStorage.getItem("abhijeet-motion");
    if (stored === "off" || stored === "on") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      return stored === "on";
    }
  } catch {
    // Use the platform preference if storage is unavailable.
  }
  return shouldDefaultToMotion();
}
function subscribeMotion(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notifyMotionChange);
  const connection = (navigator as Navigator & { connection?: EventTarget }).connection;
  connection?.addEventListener?.("change", notifyMotionChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", notifyMotionChange);
    connection?.removeEventListener?.("change", notifyMotionChange);
  };
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const enabled = useSyncExternalStore(subscribeMotion, getMotionSnapshot, () => false);
  const ready = useSyncExternalStore(subscribeMotion, () => true, () => false);

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled]);

  const setEnabled = useCallback((next: boolean) => {
    try {
      window.localStorage.setItem("abhijeet-motion", next ? "on" : "off");
    } catch {
      // Motion still works for the current visit if storage is unavailable.
    }
    notifyMotionChange();
  }, []);

  return <MotionContext.Provider value={{ enabled, ready, setEnabled }}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotion must be used within MotionProvider");
  return context;
}
