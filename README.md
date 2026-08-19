# Viketh — Portfolio

**Live:** [portfolio-viketh-two.vercel.app](https://portfolio-viketh-two.vercel.app/)

[![Portfolio preview](https://api.microlink.io/?url=https://portfolio-viketh-two.vercel.app/&screenshot=true&meta=false&embed=screenshot.url)](https://portfolio-viketh-two.vercel.app/)

```
$ whoami
Computer Science student. Still compiling.
```

A single-page portfolio built the same way I build most things — pick an idea, wire it up, see if it holds. This one's a bold, split-screen laboratory: high-contrast dark and light layers, custom scrolling tickers, custom micro-interactions, and a floating interactive AI assistant built right into the page.

## Structure

```
├── src/
│   ├── components/   → modular layout blocks (Hero, Journey, Projects, Assistant)
│   ├── index.css     → Tailwind v4 styling, custom variables, & animations
│   └── App.jsx       → layout assembly & Lenis smooth scroll setup
├── package.json      → dependencies (React, Vite, Tailwind CSS v4, Lenis)
└── index.html        → the page shell
```

Built on React and Vite with Tailwind CSS v4 for clean, utility-first styling, and structured modularly for easy extension.

## What's inside

- A **learning journey** mapping my path through core milestones: web foundations → backend APIs & systems → databases & containers → real-time event ingestion pipelines → applied AI/ML *(current)*
- A **dynamic toolbox** showing my technical stack and focus areas via custom horizontal scrolling ticker bars
- **6 projects** with live-rendered CSS mockups (e.g., event ingestion graphs, cloud routing visualizers, schema previews) filterable by category, spanning analytics pipelines, cloud routing, database apps, and sentiment analysis
- A **floating interactive AI Assistant** built directly into the layout to help visitors navigate the page and chat in real time
- An **interactive pullable string** and text-scrambling hover micro-animations that make the page feel alive and responsive
- Smooth scrolling powered by **Lenis** combined with custom scroll-reveal animations that respect system motion preferences
- A **contact form** wired directly to Formspree for frictionless backend-less email communication

## Status

`#05 · HEAD` — actively learning, actively shipping.
