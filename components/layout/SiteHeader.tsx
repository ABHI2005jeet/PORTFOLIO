"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MotionControls } from "@/components/motion/MotionControls";
import styles from "./SiteHeader.module.scss";

const links = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Work", href: "/work", section: "work" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Journey", href: "/#journey", section: "journey" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState({ pathname: "", open: false });
  const menuOpen = menu.pathname === pathname && menu.open;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    if (pathname !== "/") return;
    const targets = ["about", "selected-work", "skills", "journey", "off-duty", "contact"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenu({ pathname, open: false });
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, pathname]);

  const isActive = (section: string) => {
    if (pathname === "/work") return section === "work";
    if (pathname !== "/") return false;
    return section === "work" ? activeSection === "selected-work" : activeSection === section;
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} aria-current={isActive(link.section) ? "location" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <a className={styles.resumeLink} href="/resume/Abhijeet_Kumar_Resume_Final_v8.pdf" download>
            Résumé <span aria-hidden="true">↓</span>
          </a>
          <MotionControls />
        </div>
        <button
          ref={menuButtonRef}
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenu((current) => ({ pathname, open: current.pathname === pathname ? !current.open : true }))}
        >
          {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>
      <div className={styles.progress} aria-hidden="true"><span className="scrollProgressFill" /></div>
      <nav
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-current={isActive(link.section) ? "location" : undefined}
            onClick={() => setMenu({ pathname, open: false })}
          >
            {link.label}
          </a>
        ))}
        <a href="/resume/Abhijeet_Kumar_Resume_Final_v8.pdf" download onClick={() => setMenu({ pathname, open: false })}>
          Download résumé <span aria-hidden="true">↓</span>
        </a>
        <MotionControls />
      </nav>
    </header>
  );
}
