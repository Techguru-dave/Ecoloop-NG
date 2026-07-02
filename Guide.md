# EcoLoop NG UI Guide

EcoLoop NG is a React + TypeScript + Vite frontend for a community-driven waste collection experience. The UI is structured around a shared design system so donor, recycler, and admin experiences feel consistent while still reflecting their respective roles.

## 1. Product and UI goals

The interface is designed to be:
- Clean and trustworthy for users interacting with pickups and recyclers
- Mobile-first, but still polished on desktop
- Consistent across pages through shared components and tokens
- Easy to extend by new contributors without introducing conflicting styles

## 2. Core stack

- React 18 + TypeScript
- Vite for fast local development
- Tailwind CSS with a shadcn-style token system
- React Router for role-based flow navigation
- Lucide React for lightweight icons
- Custom UI primitives under the components layer

## 3. Styling system

### Design language
The visual system is built around a calm, sustainability-led palette:
- Primary: deep green for trust, action, and emphasis
- Secondary: light green for surfaces and soft states
- Accent: warm orange for highlights and CTA emphasis
- Neutral surfaces: white and soft gray backgrounds for readability

### Global theme
All design tokens are defined in [src/styles/globals.css](src/styles/globals.css). This is the single source of truth for:
- Color tokens such as background, foreground, primary, secondary, muted, border, and accent
- Radius scale for rounded cards, inputs, and containers
- Typography using Geist Variable
- Base body and root layout styles

The theme is intentionally centralized to avoid CSS conflicts from multiple global files.

### Styling conventions
Use utility classes directly in components, following this pattern:
- Layout and spacing: flex, grid, gap, p, px, py, mt, mb
- Surface hierarchy: bg-card, bg-background, bg-secondary, border-border
- Typography: text-foreground, text-muted-foreground, font-semibold, tracking-tight
- Interactive states: hover:border-primary, focus:ring-2 focus:ring-primary/50

Use the theme tokens rather than hard-coded colors whenever possible.

## 4. Architecture for the UI

### Page structure
The app is organized into three main layers:
1. Route-level pages in [src/pages](src/pages)
2. Shared UI primitives in [src/components/ui](src/components/ui)
3. Global styles and tokens in [src/styles](src/styles)

### Routing model
The app shell is defined in [src/App.tsx](src/App.tsx). Routes are role-based and grouped by flow:
- Donor flow: schedule pickup, browse requests, review a request
- Recycler flow: select waste types, view map and nearby hubs
- Admin flow: dashboard experience

Each page is responsible for its own local state and content, while shared layout patterns remain consistent through reusable components.

## 5. Component system

### Reusable UI primitives
The following components are the foundation of the UI and should be preferred over ad hoc markup:
- Button for primary, secondary, and outline actions
- Card for section containers and content blocks
- Input and Textarea for form controls
- StatusBadge for request and pickup states
- PickupCard for listing available pickup requests

These components live in [src/components/ui](src/components/ui) and should be extended carefully rather than duplicated.

### Page composition pattern
Most pages follow the same visual structure:
- A hero or header section with title and short supporting copy
- One or more content cards for form fields, summaries, or lists
- A footer/action bar for primary actions

A common pattern looks like this:

```tsx
<div className="min-h-screen bg-[radial-gradient(...)]">
  <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
    <header className="rounded-[2rem] border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-8">
      {/* page title and summary */}
    </header>

    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      {/* main content */}
    </div>
  </div>
</div>
```

This pattern makes pages feel coherent while leaving room for role-specific content.

## 6. Layout and interaction principles

### Responsive structure
The UI is intentionally built mobile-first:
- Stacks content vertically on smaller screens
- Uses grid layouts on larger screens
- Keeps CTAs visible and easy to tap
- Avoids overly dense layouts on narrow viewports

### Visual hierarchy
Each page should have:
- One clear primary action
- One or two supporting content blocks
- Soft borders, rounded corners, and lightweight shadows for depth
- Spacious padding to preserve clarity

### States and feedback
Use subtle visual states for selection, loading, and completion. The app already favors:
- Selected cards with stronger border and background treatment
- Icons that reinforce meaning without clutter
- Small helper text blocks to frame user intent

## 7. How to extend the UI

When adding a new screen or section:
1. Start by matching the page shell used in existing flows.
2. Reuse shared UI primitives from [src/components/ui](src/components/ui).
3. Keep styling in utility classes and theme tokens.
4. Prefer small, composable sections over one-off bespoke layouts.
5. Avoid adding new global CSS unless the change is truly system-wide.

### Recommended workflow for a new screen
- Create the page under [src/pages](src/pages)
- Add its route in [src/App.tsx](src/App.tsx)
- Build it from shared primitives and local section cards
- Verify the page in both mobile and desktop widths
- Keep the hero/header and action footer consistent with existing pages

## 8. File map

- [src/App.tsx](src/App.tsx) — app shell and route definitions
- [src/pages](src/pages) — route-level screens for donor, recycler, and admin experiences
- [src/components/ui](src/components/ui) — shared UI building blocks
- [src/styles/globals.css](src/styles/globals.css) — centralized theme and base styles
- [src/main.tsx](src/main.tsx) — app bootstrap

## 9. Development tips

- Keep the theme centralized in [src/styles/globals.css](src/styles/globals.css)
- Reuse existing component variants before introducing new ones
- Prefer semantic, descriptive class patterns over one-off custom CSS
- Keep page-specific logic inside the page component, and shared UI in component files
- When in doubt, follow the structure of an existing page such as [src/pages/DonorSchedulePickup.tsx](src/pages/DonorSchedulePickup.tsx)

## 10. Getting started

```bash
npm install
npm run dev
```

Open the local Vite URL to preview the UI and iterate on screens.
