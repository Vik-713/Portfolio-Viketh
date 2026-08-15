# Viketh — Portfolio

**Live:** [portfolio-viketh-two.vercel.app](https://portfolio-viketh-two.vercel.app/)

[![Portfolio preview](https://api.microlink.io/?url=https://portfolio-viketh-two.vercel.app/&screenshot=true&meta=false&embed=screenshot.url)](https://portfolio-viketh-two.vercel.app/)

```
$ whoami
Computer Science student. Still compiling.
```

A single-page portfolio built the same way I build most things — pick an idea, wire it up, see if it holds. This one's a "builder's lab notebook": warm paper background, an indigo signal accent, and a small animated node-graph in the hero that's a quiet nod to the multi-agent systems I've been reading about lately.

## Structure

```
├── index.html   → the page
├── style.css    → the look
└── script.js    → the behavior
```

Three files, one page, zero build step. Open `index.html` and it just works — keep all three in the same folder.

## What's inside

- A **learning journey** section styled like a git log — because the path here really was commit by commit: web → backend → databases → real-time systems → AI/ML *(current)*
- A **toolbox** of everything from Python and React to ESP8266 and RabbitMQ
- **12 projects**, filterable by category, spanning full-stack apps, ML experiments, and IoT builds
- A **contact form** wired to Formspree — no backend, but it still reaches an inbox
- Scroll-triggered reveals, a staggered hero load-in, and a floating node-graph — motion that respects `prefers-reduced-motion` for anyone who'd rather the page hold still

## Status

`#05 · HEAD` — actively learning, actively shipping.