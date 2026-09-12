# React + TypeScript + Vite — Learning Guide

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Folder Structure](#2-folder-structure)
3. [Tailwind CSS Setup](#3-tailwind-css-setup)
4. [React Router Setup](#4-react-router-setup)

## 1. Project Setup

### Install Node.js

### Windows
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** installer (`.msi`)
3. Run it → accept all defaults → Finish
4. **Close and reopen** your terminal (PATH only updates in new terminals)

### macOS
**Option A — installer (simplest):**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** installer (`.pkg`) → run it → accept defaults

### Verify
```bash
node -v
```
Expected: `v22.x.x` or higher.


### Install pnpm

```bash
npm install -g pnpm
```

### Verify
```bash
pnpm -v
```
Expected: `10.x.x` or higher.

## Install Git

### Windows
1. Download from [git-scm.com](https://git-scm.com)
2. Run the installer → **accept every default** (the defaults are correct for this course)
3. Reopen your terminal

### macOS
Run this in Terminal:
```bash
git --version
```

## Install VS Code

1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install it

### Windows — during install, check these boxes
- ✅ Add "Open with Code" action to file context menu
- ✅ Add "Open with Code" action to directory context menu
- ✅ Add to PATH (checked by default — leave it)

### macOS — enable the `code` command
1. Drag VS Code into **Applications**
2. Open VS Code
3. Press `Cmd + Shift + P`
4. Type: `Shell Command: Install 'code' command in PATH` → press Enter

### Verify
```bash
code -v
```
Expected: a version number like `1.10x.x`.

## Prerequisites Check

Run all four. Every one must print a version number.

```bash
node -v
```

```bash
pnpm -v
```

```bash
git --version
```

```bash
code -v
```

## Scaffold the Project

Navigate to where you keep your projects, then:

```bash
pnpm create vite@latest .
# Select: React → TypeScript + SWC or TypeScript
```

for learning, choose typescript without react compiler.


### Key files created
| File | Purpose |
|---|---|
| `index.html` | Single HTML file — entry point for the browser |
| `src/main.tsx` | React entry — mounts `<App />` into `#root` |
| `src/App.tsx` | Root component |
| `vite.config.ts` | Vite configuration |
| `tsconfig.app.json` | TypeScript config for source files |

### Boot sequence
```
index.html → main.tsx → App.tsx → your components
```

### `main.tsx` — set once, rarely touched
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

> **StrictMode** — in development only, renders components twice to catch bugs. No effect in production.

## 2. Folder Structure

### Recommended structure
```
src/
  assets/           ← images, fonts, static files
  components/
    ui/             ← reusable generic UI (Button, Card, Modal)
    layout/         ← Header, Sidebar, Footer
  context/          ← React Context files
  hooks/            ← custom hooks
  pages/
    landing/           ← public landing pages
    auth/           ← login, register, forgot password
  routes/           ← route definitions
  services/         ← API call functions
  types/            ← shared TypeScript types
  utils/            ← pure helper functions
  App.tsx
  main.tsx
  index.css
```

### Rules
- `components/` — reusable, not tied to any page
- `pages/` — tied to a route, composed of components
- Start minimal, add folders only when you need them
- File naming: `LoginPage.tsx`, `CustomButton.tsx` — PascalCase for components


## 3. Tailwind CSS Setup

### Install (Tailwind v4 + Vite)
```bash
npm install tailwindcss @tailwindcss/vite
```

### `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### `src/index.css` — replace everything with:
```css
@import "tailwindcss";
```

### Verify
Add a Tailwind class to any component:
```tsx
<h1 className="text-3xl font-bold text-blue-500">Hello</h1>
```

> **Note:** Remove all Vite scaffold CSS from `index.css` and `App.css` — they override Tailwind classes.


## 4. React Router Setup

### Install
```bash
npm install react-router@latest
```

### File: `src/main.tsx`
Wrap app with `BrowserRouter`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

### File: `src/routes/index.tsx`
```tsx
import { Routes, Route } from 'react-router'
import LandingPage from '../pages/home/LandingPage'
import LoginPage from '../pages/auth/LoginPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
```

### File: `src/App.tsx`
```tsx
import AppRoutes from './routes'

const App = () => {
  return <AppRoutes />
}

export default App
```