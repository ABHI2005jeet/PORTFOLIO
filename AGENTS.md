# Non-negotiable portfolio rules

## 0. Operating rules

1. **Inspect first.** Read the repo structure, `package.json`, configs and any existing code, images, résumé or docs. If a project already exists, preserve what works and build on it. Do not overwrite blindly or create a second disconnected project.
2. **First action:** create `AGENTS.md` at the repo root restating sections 0, 1, 8 to 13 as non-negotiable rules so they persist across sessions.
3. **Hard rule on facts:** use only facts from this brief, my résumé, and what you verify on my public profiles and repositories. Never invent metrics, followers, stars, ratings, solved counts, employers, clients, testimonials, awards, emails or project details. Anything unknown becomes a `TODO(abhijeet)` comment plus a graceful empty state. No lorem ipsum on the live page.
4. **Never claim what you did not verify.** If a reference, profile or repo cannot be accessed, say so and continue without it; do not pretend you inspected it. If a metric cannot be measured, say "not verified". Do not claim a Lighthouse score you did not run.
5. **I am the art director.** I will review and push back. Do not defend weak choices; list uncertain ones under "Decisions for Abhijeet" in every phase summary.
6. After each phase: run lint, `tsc --noEmit` and `next build`, commit, and give me a 5-line summary.

---

## 1. Who I am and how to position me

**Name:** Abhijeet Kumar. **Base:** Agra, India. **Studying:** B.Tech CSE (Cyber Security), Vellore Institute of Technology, Chennai, 2024 to 2028, CGPA 8.55.

**Positioning (this drives all copy):** a **pre-final-year engineering student exploring tech**. My core is **software development (SDE)**: full-stack MERN and Next.js. Alongside it I am exploring **cyber security**, **DevOps** and **cloud**. I am **looking for internships**. Present me as ambitious, curious, hands-on and honest: someone who builds real things and learns in public. Do not present me as a senior engineer, security researcher, manager, educator, founder or professional designer.

**Honest depth:** wherever skills or tracks appear, show depth with three levels: *Building* (shipped projects), *Practising* (labs, courses, coursework), *Exploring* (early stage). Never imply expertise because a tool is installed or mentioned.

**Experience:** Software Development Intern, ADRDE (DRDO), Agra, May 2026 to Jun 2026.
- Built the **ADRDE Agra Dashboard Portal**: a working full-stack prototype with modular architecture, JWT authentication and role-based access control. Modules: user management, meetings, notifications, reports. Stack: React, Vite, Node.js, Express, MongoDB, Tailwind CSS, Socket.io. Frontend on Vercel and backend on Render for review; architecture, modules, testing and roadmap documented.
- Mandatory framing: "working prototype built during my internship; groundwork for a LAN-based internal system". Never say it is deployed or used inside DRDO.

**Skills (from résumé and projects; levels to be confirmed in the interview):**
- Languages: C, C++, Python, Java, JavaScript, TypeScript.
- Web: HTML, CSS, React, Next.js (App Router), Node.js, Express, MERN, Tailwind, Bootstrap; MongoDB, Prisma, Clerk, Neon, Appwrite, Cloudinary, JWT.
- Security: Kali Linux, Bash, log analysis, ethical hacking practice, Wireshark, Burp Suite, DVWA, Metasploit basics.
- Cloud and DevOps: Microsoft Azure Fundamentals (AZ-900), AWS Amplify deployment (coursework project), Docker, deployments on Vercel and Render. Claim nothing further (for example CI/CD or Kubernetes) unless a repo proves it.
- Core CS: DSA, OOP, OS, DBMS, computer networks. Tools: Git, GitHub, VirtualBox, VS Code.

**Certifications (verify against résumé):** Complete Web Development (Udemy, Hitesh Choudhary); Google Cybersecurity (Coursera); Microsoft Azure Fundamentals AZ-900; Deloitte Cybersecurity Simulation; HTML & CSS (Udemy); Ethical Hacking (TuteDude).

**Proof (store in config as "as of" values I will verify):** LeetCode 190+ solved; GitHub 24 public repositories; HackerRank "4★ Python" (confirm wording with me). No live API calls and no scraping of these profiles at runtime.

**Beyond code:** I watch anime, web series and films, and play PC games; I do strength training and long-distance running. This is the personality layer: small, controlled, never overwhelming the professional story.

**Profiles (use these exact destinations):**
- GitHub https://github.com/ABHI2005jeet (primary source for validating projects)
- LeetCode https://leetcode.com/u/ABHI_2005_jeeT/
- LinkedIn https://www.linkedin.com/in/abhijeet-kumar-357ba5329/
- Instagram https://www.instagram.com/abhi.jeet.2005/ (ask me whether to show it)
- Email: ask me which address to display (see section 2).

**Contact rules:** never print an email address or phone number in static HTML. Use a "Copy email" button and a `mailto:` assembled at runtime. No contact form and no backend. Do not publish my phone number anywhere.

**Résumé:** read my résumé PDF from the repo (look in `public/resume/` and the repo root) and cross-check every fact above. If it is missing, ask me and document the expected path `public/resume/`. The "Résumé" action is a plain download link to that file.

---

## 8. Animation system and interaction quality

Motion must feel smooth and intentional; performance and usability beat effect count. **Ownership rule:** GSAP owns coordinated timelines and scroll scenes; Motion owns localized component interactions. Never animate the same element with both.

**GSAP management (strict):**
- Register plugins once in `lib/motion/register.ts`. Animate through `useGSAP` with a `scope` ref (or `gsap.context`) so everything reverts on unmount and route change. No orphaned ScrollTriggers; safe under React Strict Mode; no repeated runs.
- One ticker: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. The Three render loop also runs from this ticker.
- Named reusable timelines: `loader → heroIntro` as a single master timeline; scroll scenes in `lib/motion/scenes/`. Use `gsap.matchMedia()` for desktop, mobile and reduced motion. Do not create a ScrollTrigger for trivial elements. Call `ScrollTrigger.refresh()` after fonts and images settle and on resize.
- Animate `transform` and `opacity` (plus shader uniforms). Use `will-change` only while animating. Prefer CSS for simple transitions.

**Motion budget:** one orchestrated intro, one signature hero interaction, and responses to user actions (hover, press, tab switch, menu, route change). Micro-interactions: magnetic primary buttons and a soft cursor glow (fine pointers only, never hiding the native cursor on touch, never covering project links), link underline wipes, project-row hover preview, tab indicator morph, thin scroll-progress line, split-text reveal on the hero and one other headline. Split text keeps full text in the DOM with `aria-label` on the parent and `aria-hidden` on the split spans.

**Controls:** a visible, persisted "Motion on/off" toggle that disables Lenis, WebGL animation and non-essential tweens. Respect `prefers-reduced-motion` and `Save-Data` by default. Under reduced motion remove parallax, scroll-jacking, looping and large transitions. If Lenis interferes with keyboard navigation, anchors, mobile scrolling or nested scroll, limit or remove it (`data-lenis-prevent` for scrollable inner areas).

**Loading screen:** a short game-boot sequence on the atmosphere background (status lines plus a 0 to 100 counter), hard cap 1.2 s, shown once per session, skipped for reduced motion. It must never delay hydration or LCP and never gate the content: the real page is already in the DOM and painted beneath it, the hero `h1` is revealed within the cap, and nothing waits for WebGL, fonts or images. If measurements show it hurts LCP, shrink or remove it. No logo. Set the `<html>` background inline to `--void` so there is no white flash. Expose it with `role="status"`; never trap focus.

**Route transitions:** ≤400 ms atmosphere wipe, never breaking back/forward, off when motion is off.

**Hero shader (GLSL):** two drifting fractal-noise layers coloured from the atmosphere ramp, a pointer-driven light cone (uniform eased with `gsap.quickTo`), vignette, subtle grain. Render at about 0.6x resolution and upscale, cap DPR at 1.25, target ≤3 ms/frame on a mid-range phone. Build the static CSS hero first so it is excellent on its own. Lazy-load Three via dynamic import after first paint and idle. Fall back to the static hero when WebGL is missing, context is lost, motion is reduced, data-saver is on or the device is weak. Pause rendering when the hero is off-screen or the tab is hidden; do not render continuously if nothing changes. Dispose geometries, materials, textures, renderer and listeners on unmount.

---

## 9. Performance (hard requirement, measured)

- Targets: Lighthouse mobile Performance ≥95; Accessibility, Best Practices, SEO = 100; desktop Performance ≥98. LCP ≤1.8 s, FCP ≤1.0 s, TBT ≤150 ms, CLS ≤0.02, INP ≤150 ms. (Floor for acceptance: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.)
- **The LCP element is the server-rendered hero `h1` text**, never an image, canvas or JS-inserted node.
- First-load JS for `/` ≤170 kB gzip. Three.js, Anime.js and below-the-fold scene code load lazily. Keep Client Components small; import only what is used; remove unused packages.
- Fonts via `next/font`, subsetted, `display: swap`, preloaded only for above-the-fold weights, size-adjusted fallbacks.
- Images via `next/image` with explicit dimensions or aspect ratios, AVIF/WebP, `priority` only for a genuine LCP image. SVG for simple graphics. No large base64 assets in source, no video backgrounds unless clearly worth it. `content-visibility: auto` on below-the-fold sections. No render-blocking third-party scripts.
- Run a production build, Lighthouse (mobile and desktop) and `ANALYZE=true next build`; report real numbers and the three largest chunks with fixes. Check hydration errors, console warnings, layout shift, broken links, unnecessary requests and long-running loops.

---

## 10. Accessibility and responsiveness (WCAG 2.2 AA minimum)

Semantic HTML; landmarks; one `h1` per page and logical headings; "Skip to content" as the first focusable element; DOM order equals visual order so tab order is logical; visible high-contrast focus indicators (never `outline: none` without a replacement); descriptive link text; accessible names for icon-only buttons; real `button` elements, never `div` buttons; contrast ≥4.5:1 including text over atmosphere (use scrims); meaning never by colour alone; touch targets ≥44 px; menus, tabs and dialogs fully keyboard operable with correct ARIA; the WebGL canvas `aria-hidden` and unfocusable; meaningful `alt` or empty `alt`; `lang="en-IN"`. No horizontal overflow. Test at 360, 390, 768, 1024, 1440 and a wider desktop. Playwright + axe on every route with zero violations.

---

## 11. SEO, discoverability and AI readability

- Metadata API on every route: unique title and description, canonical (only once the real domain is known; never localhost), Open Graph, Twitter `summary_large_image`, `theme-color` #090A0F, `robots: index, follow`, locale `en_IN`. `opengraph-image.tsx` per page, on-theme, no logo. `sitemap.ts` and `robots.ts` allowing major search and AI crawlers. Correct 404 status.
- JSON-LD with only verified fields: `Person` (`sameAs`: GitHub, LinkedIn, LeetCode; `alumniOf` VIT), `WebSite`, `ProfilePage`, and `SoftwareSourceCode`/`CreativeWork` per visible project. No fake reviews, ratings, employers or credentials.
- **LLM optimisation:** `/llms.txt` (name, introduction, education, focus areas, verified projects with repo links, official profiles, contact only if verified, guide to site sections) and `/llms-full.txt` (full profile, experience, projects, skills as clean Markdown). Also serve a Markdown twin of each public page at `<path>.md`, linked with `<link rel="alternate" type="text/markdown">`. Generate all of it from the typed content files so it cannot drift, and exclude hidden projects. Do not claim these files guarantee ranking or crawler support.
- All meaningful text is in server-rendered HTML, never only after animation or a client fetch. Natural copy; discoverability comes from accurate content about my real work and technologies.

---

## 12. Security (the site itself should be hardened)

Nonce-based Content-Security-Policy through the framework's request-interception layer (follow the installed version's docs), plus `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'` and HSTS; aim for A+ on securityheaders.com and Mozilla Observatory. No secrets in the client bundle; no `dangerouslySetInnerHTML` except JSON-LD; dependencies pinned; `npm audit` clean at the end; cookie-less analytics only.

---

## 13. No generic template, no fake content

Do not build a template and insert my name. No fake testimonials, companies, client logos, user statistics, project metrics, experience or arbitrary counters. No sections that exist only because other portfolios have them. Every effect must serve the experience. Every project statement must be verifiable. Missing information gets a sensible fallback plus a `TODO(abhijeet)`. No buttons that look functional but do nothing; no TODO comments in place of important sections.

---
