# Abhijeet Kumar

**Software development · Cyber security · Cloud**

Pre-final-year B.Tech CSE (Cyber Security) student at VIT Chennai, building practical software and learning how it reaches people.

[Live portfolio](https://abhijeet-kumar-rosy.vercel.app/) · [Repository](https://github.com/ABHI2005jeet/PORTFOLIO) · [GitHub](https://github.com/ABHI2005jeet) · [LinkedIn](https://www.linkedin.com/in/abhijeet-kumar-357ba5329/) · [Résumé](public/resume/Abhijeet_Kumar_Resume_Final_v8.pdf)

![Portfolio homepage](docs/portfolio-preview.png)

This portfolio brings together selected projects, internship experience, and current learning across software engineering, security, cloud, and DevOps. The visual direction keeps the site personal while making the work easy to explore.

## What’s here

- **15 project pages** with summaries, technologies, source links, and contribution details.
- **Experience and education** drawn from my résumé.
- **Skills explorer** with keyboard-accessible tabs and project filters.
- **Off-duty section** with the interests and five photos I chose to share.
- **Résumé and contact links** in the site navigation.

## Built with

| Area | Tools |
| --- | --- |
| App | Next.js App Router, React, TypeScript |
| Styling | SCSS Modules, local Fraunces and Hanken Grotesk fonts |
| Motion and visuals | GSAP, Three.js, custom shader atmosphere |
| Quality | Playwright, axe-core, ESLint, TypeScript |
| Hosting | Vercel |

The page content is server-rendered. Motion respects `prefers-reduced-motion`, can be switched off in the site header, and the WebGL atmosphere is deferred to compatible desktop devices.

## Performance and checks

Three Lighthouse runs against the local production build on 1 Nov 2026; values below are medians. The mobile profile uses Lighthouse’s mobile emulation and the desktop profile uses its desktop preset.

| Lighthouse metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 86 | 99 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 4.05 s | 0.87 s |
| First Contentful Paint | 1.07 s | 0.30 s |
| Total Blocking Time | 108 ms | 51 ms |
| Cumulative Layout Shift | 0.010 | 0.030 |

The scores are snapshots from Lighthouse 13.6.0 and Chrome on a local machine; real devices and networks will vary. The browser suite passes **41 checks**, including WCAG 2.2 AA axe scans on all 17 public routes and overflow checks at 360, 390, 768, 1024, 1440, and 1920 pixels.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run audit
```

## Update portfolio content

| File | Content |
| --- | --- |
| `content/site.ts` | Profile, social links, and dated profile figures |
| `content/projects.ts` | Project descriptions, links, visibility, and contributions |
| `content/experience.ts` | Education and experience timeline |
| `content/skills.ts` | Skill groups and learning tracks |
| `content/offduty.ts` | Personal interests |

Project visibility can be set to `featured`, `listed`, or `hidden`. Hidden projects are left out of the site and generated text feeds. Replace images under `public/images/` with files of the same names to update the photos; the résumé path is `public/resume/Abhijeet_Kumar_Resume_Final_v8.pdf`.

## Live deployment

The production site is [abhijeet-kumar-rosy.vercel.app](https://abhijeet-kumar-rosy.vercel.app/), hosted on Vercel. The app uses `NEXT_PUBLIC_SITE_URL` to build canonical URLs, Open Graph image URLs, and sitemap entries; set it to `https://abhijeet-kumar-rosy.vercel.app` in the Vercel project’s Environment Variables if it isn’t already set, then redeploy. No custom domain is configured.

Project facts and remaining follow-ups are tracked in [`ASSUMPTIONS.md`](ASSUMPTIONS.md) and [`TODO.md`](TODO.md).
