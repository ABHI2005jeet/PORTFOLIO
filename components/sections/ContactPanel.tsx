"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { site } from "@/content/site";
import styles from "./ContactPanel.module.scss";

const local = site.contact.emailLocalPart;
const domain = site.contact.emailDomain;

export function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const address = `${local}@${domain}`;
  const openEmail = () => { window.location.href = `mailto:${address}`; };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${address}`;
    }
  };

  return (
    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <div className={`pageShell ${styles.contactInner}`}>
        <div className={styles.contactTop}><span className="sectionEyebrow">06 / Contact</span><span className="monoLabel">GOOD WORK STARTS WITH A CONVERSATION</span></div>
        <h2 id="contact-title">Have an internship<br />or a <em>good problem?</em></h2>
        <div className={styles.contactBottom}>
          <p>I’m looking for software development internships and opportunities to learn through real product work.</p>
          <div className={styles.contactActions}>
            <button className={styles.emailButton} type="button" onClick={openEmail}>Email me <ArrowUpRight aria-hidden="true" size={17} /></button>
            <button className={styles.copyButton} type="button" onClick={copyEmail} aria-live="polite">{copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}{copied ? "Copied" : "Copy email"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
