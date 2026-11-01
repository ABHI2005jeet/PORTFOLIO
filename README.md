# Abhijeet Kumar — Portfolio

Personal portfolio built with Next.js App Router, React, TypeScript, SCSS Modules, GSAP, Motion, and a lazily loaded Three.js hero shader.

## Run locally

    npm install
    npm run dev

## Production checks

    npm run typecheck
    npm run lint
    npm run build
    npm run start

The analyze script creates a webpack bundle report. The e2e script runs the Playwright and axe checks.

Set NEXT_PUBLIC_SITE_URL to the deployed portfolio origin to enable canonical URLs, social image metadata, and sitemap entries. It is intentionally unset while no portfolio domain has been provided.

Project facts are maintained in content/. Unverified details and art-direction decisions are tracked in TODO.md.
