# Viketh Hegde Portfolio Website - Technical Documentation

This document provides a comprehensive technical overview of the portfolio application, detail on its file-by-file directory structure, and explanations of how the components integrate and work together.

---

## 1. Technical Stack Overview

The website is a modern, high-contrast, typographic frontend application designed with React and Vite. It utilizes responsive designs, micro-animations, and smooth inertia physics scrolling.

* **Core Framework**: React 19 (Component-based UI state architecture)
* **Build System & Tooling**: Vite 8 (Fast Hot Module Replacement, Rollup client-side bundling)
* **Styling System**: Tailwind CSS v4 (Modern CSS-in-JS utility-first styling with native CSS @theme configurations)
* **Inertial Smooth Scrolling**: Lenis Scroll Engine (JavaScript-based smooth mouse-wheel physics orchestration)
* **Visual Iconography**: Lucide React (SVG stroke icons loaded dynamically)
* **Contact Pipeline**: Formspree API (Asynchronous AJAX form submissions with validation and loading states)

---

## 2. Directory Structure

```text
Portfolio/
├── index.html                  # Main SPA HTML container
├── package.json                # Project dependencies, build scripts
├── vite.config.js              # Vite bundler options
├── public/                     # Static assets (PDF resume, portraits, icons)
│   ├── resume.pdf
│   ├── image.jpeg
│   └── favicon.svg
└── src/                        # React source code root
    ├── main.jsx                # DOM bootstrapping and mounting
    ├── App.jsx                 # Main layout shell and state orchestrator
    ├── index.css               # Core styling directives and animations
    ├── fonts.css               # Embedded custom font faces (Akira, Clash Display, Google Sans)
    ├── assets/                 # Client assets (SVG, PNG files)
    └── components/             # Reusable UI component modules
        ├── Hero.jsx            # Dynamic typography introduction
        ├── About.jsx           # Bio section with resume view/download triggers
        ├── Skills.jsx          # Interactive tech stack grids and progress blocks
        ├── Journey.jsx         # Sticky timeline milestone progress layout
        ├── Projects.jsx        # Project showcases with interactive cards
        ├── Contact.jsx         # Controlled form sending data to Formspree
        ├── Menu.jsx            # Navigation links linking to Lenis targets
        ├── Assistant.jsx       # Interactive floating mock AI assistant
        ├── CustomCursor.jsx    # Mouse tracker utilizing invert filter layers
        ├── Preloader.jsx       # Typographic landing preloader
        ├── ScrollReveal.jsx    # Intersection Observer wrapper for section reveals
        ├── InteractiveString.jsx# Canvas-like interactive elastic divider string
        ├── Ticker.jsx          # Infinite marquee text loop component
        └── ScrambleText.jsx    # Random-character text reveal animation helper
```

---

## 3. Detailed File Breakdown

### Entry Point & Orchestration

* **`index.html`**
  The template document containing the root mount element (`<div id="root">`) and loading the React entry script `src/main.jsx`.
* **`src/main.jsx`**
  The entry script for Vite. Registers the React virtual DOM container and renders the global `<App />` component.
* **`src/App.jsx`**
  The central dashboard and layout state manager.
  * Manages global states like `menuOpen` and `isLoaded`.
  * Instantiates **Lenis Smooth Scroll** within a lifecycle `useEffect` hook, enabling smooth inertia physics across all devices.
  * Sequentially mounts and structures all major sections (`Hero`, `About`, `Skills`, `Journey`, `Projects`, `Contact`, `Footer`).
  * Integrates utility components like the custom interactive cursor (`CustomCursor`) and chat drawer (`Assistant`).

### Core Styling & Fonts

* **`src/index.css`**
  Declares Tailwind CSS directives. Implements custom styling overrides, responsive scrollbar designs, infinite marquee keyframes, and menu link transitions. Defines custom font families inside Tailwind's v4 `@theme` block.
* **`src/fonts.css`**
  Injects custom font definitions (`Akira`, `Clash Display`, `Google Sans`) from physical files into the CSS rendering engine.

### Layout Section Components

* **`src/components/Hero.jsx`**
  Displays the large typographic landing screen utilizing the `font-akira` font family.
* **`src/components/About.jsx`**
  Renders the introduction bio paragraph, social media link arrays (GitHub, LinkedIn, Email), and triggers to open or download the resume PDF file.
* **`src/components/Skills.jsx`**
  Visualizes the technology stack in a responsive 4-column layout:
  * Categorizes skills into Languages, Frameworks, Data & DevOps, and AI/ML.
  * Implements tactile hover actions that shift shadows (`shadow-[6px_6px]` to `shadow-[12px_12px]`) and translate boxes.
  * Employs structured level bars showing skill level.
  * Uses a grid layout transition (`grid-template-rows: 0fr -> 1fr`) to animatively expand individual skill descriptions.
  * Displays a dashed border pulsing placeholder for "AI & Machine Learning" to reflect ongoing studies.
* **`src/components/Journey.jsx`**
  Shows a timeline detailing education and project milestones. Employs a sticky sidebar container alongside interactive list items that elevate on hover.
* **`src/components/Projects.jsx`**
  Presents academic and personal project cards. Includes lists of used tools, descriptive details, and buttons linking back to the respective GitHub repositories.
* **`src/components/Contact.jsx`**
  Renders a contact form connected to **Formspree** via asynchronous AJAX fetch requests. Displays visual feedback (sending, success, error) and contains a responsive details card with helper texts.
* **`src/components/Menu.jsx`**
  Renders the responsive full-screen menu overlay with floating toggle triggers. Interacts with the global Lenis scrolling variable to glide down to targeted anchors smoothly.

### Interactive Utility Components

* **`src/components/Assistant.jsx`**
  A customized simulated AI assistant. Renders a chat bubble at the bottom right. When opened, it reveals a chat panel, stops background scrolling, and replies to user questions with typed text outputs.
* **`src/components/CustomCursor.jsx`**
  Spawns a circular pointer tracker that moves with mouse coordinates. Uses CSS blend modes (`mix-blend-mode: difference`) to invert colors when hovering over contrasting backgrounds.
* **`src/components/Preloader.jsx`**
  A landing page preloader that blocks body scrolling during loading. Fades out once animations complete to unlock normal page features.
* **`src/components/ScrollReveal.jsx`**
  A modular animation wrapper. Uses an **Intersection Observer** instance to trigger entrance transitions once sections scroll into view.
* **`src/components/InteractiveString.jsx`**
  An interactive divider line. Calculates mouse drag coordinates relative to an SVG curve, causing the line to flex like an elastic string when hovered and snap back.
* **`src/components/Ticker.jsx`**
  An infinite marquee ticker. Dynamically duplicates arrays of skill tags and scrolls them continuously using CSS animation.
* **`src/components/ScrambleText.jsx`**
  Cycles random alphanumeric strings before rendering target words to create a high-tech loading effect.


## 4. How the Components Work Together

```mermaid
graph TD
    index.html --> main.jsx
    main.jsx --> App.jsx
    App.jsx --> LenisScroll[Lenis Smooth Scroll Engine]
    App.jsx --> Preloader
    App.jsx --> CustomCursor
    App.jsx --> Assistant
    App.jsx --> Menu
    
    subgraph Core Sections (Scrolled and revealed sequentially)
        App.jsx --> Hero
        App.jsx --> About
        App.jsx --> Skills
        App.jsx --> Journey
        App.jsx --> Projects
        App.jsx --> Contact
    end

    Preloader -- Locks Scrolling --> LenisScroll
    Preloader -- Signals loaded state --> App.jsx
    Menu -- Triggers smooth transition scroll --> LenisScroll
    Assistant -- Halts Scrolling --> LenisScroll
```

### Flow Sequence:
1. **Bootstrapping**: `index.html` loads `main.jsx` which mounts `App.jsx`.
2. **Preloading**: `Preloader` displays immediately, locking Lenis scrolling.
3. **Activation**: Once loading finishes, scrolling is unlocked, and `CustomCursor` begins tracking mouse movements.
4. **Interaction**:
   * Hovering over strings triggers flex calculations in `InteractiveString`.
   * Opening the `Menu` lets users jump smoothly to sections using Lenis.
   * Interacting with `Skills` triggers local CSS grid height changes.
   * Submitting forms in `Contact` launches POST requests to Formspree, updating user indicators.
   * Opening the `Assistant` stops background scrolling, allowing chat interactions.
