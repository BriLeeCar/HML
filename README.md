# Help Me Leave (HML)

Private development repo for the **Help Me Leave** project. This version supersedes the original [nw-iguana/help-me-leave](https://github.com/nw-iguana/help-me-leave) repo.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS
- **Markdown/Content**: MDX
- **State Management**: TBD
- **Database**: PostgreSQL
- **Deployment**: TBD

---

## Repo Structure (Planned)

- `@types` – TypeScript types and interfaces
- `public` – Static assets (images, icons, etc.)
- `/src` - Source code for the application
  - `/app` – Next.js App Router pages
  - `/components` – Shared and semantic UI components
  - `/util` – Utility functions and helpers
  - `/data` – Static content (markdown or JSON)
  - `/styles` – Tailwind config and globals

---

## Getting Started

```bash
git clone https://github.com/BriLeeCar/HML.git
cd HML
pnpm install
```

---

## Branching & Workflow

- Use conventional commit messages
  - _IE_: feat, fix, refactor, chore, docs, style
- Submit a PR with a **clear summary of changes**
