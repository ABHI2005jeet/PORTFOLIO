import { site } from "@/content/site";
import styles from "./SiteFooter.module.scss";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`pageShell ${styles.inner}`}>
        <p className={styles.name}>{site.name}</p>
        <p className={styles.note}>Built with care in Agra, India.</p>
        <nav aria-label="Footer links" className={styles.links}>
          <a href={site.profiles.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.profiles.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.profiles.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
          <a href={site.profiles.hackerrank} target="_blank" rel="noopener noreferrer">HackerRank</a>
          {site.instagramVisible && <a href={site.profiles.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
        </nav>
        <a className={styles.top} href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
