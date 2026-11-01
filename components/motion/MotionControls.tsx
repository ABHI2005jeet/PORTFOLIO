"use client";

import { useMotion } from "./MotionProvider";
import styles from "./MotionControls.module.scss";

export function MotionControls() {
  const { enabled, ready, setEnabled } = useMotion();
  const label = ready ? `Motion ${enabled ? "on" : "off"}` : "Motion setting";

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-pressed={ready ? enabled : false}
      onClick={() => setEnabled(!enabled)}
      disabled={!ready}
    >
      <span className={styles.indicator} aria-hidden="true" data-on={enabled} />
      {label}
    </button>
  );
}
