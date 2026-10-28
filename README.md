# Marketing-Manager-

> **BrandPilot AI — Your Personal AI Marketing Department & Portfolio Blog Manager**
> Built for Mohammed Katanani ([thekatanani.com](https://thekatanani.com)).

BrandPilot AI transforms verified software engineering experiences, architectural trade-offs, and measurable business outcomes into high-converting, platform-tailored content across **LinkedIn**, **Instagram**, and **X**, while keeping you in complete control as the Marketing Director.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Server Components & Server Actions)
- **Language**: TypeScript (Strict mode, zero `any`)
- **Styling**: Tailwind CSS + Custom Dark Theme
- **Icons**: Lucide React + Custom SVG Platform Icons
- **Database & ORM**: SQLite (instant local development) + PostgreSQL readiness via Prisma ORM
- **Authentication**: Auth.js (NextAuth v5 beta) with credentials & session management
- **Validation**: Zod (Input validation, schema enforcement, anti-hallucination guard)
- **Containerization**: Docker Compose (`docker-compose.yml` for PostgreSQL 16 Alpine)

---

## 🏗️ Completed Application Modules (Sections 3 & 10)

| Route | Module | Capabilities |
| :--- | :--- | :--- |
| `/` | **Landing Page** | High-polish hero showcasing BrandPilot's value proposition. |
| `/dashboard` | **Overview Command Center** | Real-time KPIs: Documented Projects (3), Approved Ideas, Draft Packages, Active Content Pillars (4), Active Campaign Tracker. |
| `/dashboard/strategy` | **Module A: Brand & Strategy Center** | Developer identity, target audience segments (Recruiters, Tech Leads, E-Commerce Founders), tone of voice rules, and approved content pillars. Atomic updates via Server Actions. |
| `/dashboard/projects` | **Module B: Project Knowledge Base** | The anti-hallucination source of truth. Structured case studies (Problem -> Architecture -> Measurable Impact -> Lessons Learned) with direct 1-click angle extraction. |
| `/dashboard/projects/new` | **Case Study Wizard** | Multi-step STAR framework form to document real engineering achievements. |
| `/dashboard/ideas` | **Module B: AI Idea Lab** | Interactive Idea Board. Modal allows picking any project from the Knowledge Base to generate 3 fact-backed angles. 1-click "Draft 3 Posts" button generates platform packages. |
| `/dashboard/content` | **Module C: Content Studio** | Package list showing multi-platform drafts with status badges (`IN_REVIEW`, `APPROVED`, `DRAFT`). |
| `/dashboard/content/[id]` | **Multi-Platform Studio Editor** | Platform tabs (LinkedIn narrative, Instagram 6-slide carousel mockup with visual cues, X thread simulator with tweet character counter). Live copy editor, 1-click post clipboard copy, and Human Approval controls. |
| `/dashboard/review` | **Approval Queue** | Human-in-the-loop gatekeeper. Inspect fact anchors, review all 3 drafts, approve for publication, or request revisions with Director feedback. |
| `/dashboard/calendar` | **Module D: Content Calendar** | Weekly editorial calendar with scheduled posts, open slot visualizer, and 1-click draft scheduler. |
| `/dashboard/campaigns` | **Marketing Campaigns** | Timeframe and objective tracking for career and freelance goals. |
| `/dashboard/analytics` | **Module E: Performance & Outcomes** | Outcome attribution tracking: impressions, engagements, recruiter DMs, active remote interviews ($155k-$165k/yr), and closed client contracts ($14,000 deal). |
| `/dashboard/accounts` | **Social Accounts Center** | Connection manager for LinkedIn, Instagram Creator, and X with official API compliance guidelines. |
| `/dashboard/settings` | **System Settings** | AI provider keys (OpenAI / Gemini / Anthropic) and brand safety guards. |
| `/login` & `/register` | **Authentication** | Auth.js credentials provider with **1-click Instant Demo Sign In**. |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v20+ or v22+
- **pnpm** v10+ (or npm / yarn)

### 2. Setup Database & Seed Case Studies
```bash
# Push Prisma schema to local SQLite database
pnpm db:push

# Seed demo user, brand profile, 3 rich verified case studies, metrics, and leads:
pnpm db:seed
```

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Access Credentials

- **Email**: `demo@brandpilot.ai`
- **Password**: `password123`
- *Or click **"Instant Demo Sign In (1-Click)"** on the `/login` page.*

---

## 📁 Pre-Seeded Real Case Studies

1. **Iraq & MENA Multi-Carrier SMS Gateway Architecture**:
   - *Problem*: 42% OTP delivery failure rate on Iraqi networks (Asiacell, Zain) with standard Twilio stack, causing $14,000/mo in cart abandonment.
   - *Architecture*: Multi-carrier failover routing engine with Node.js, PostgreSQL, Redis, and webhook delivery confirmations.
   - *Measurable Impact*: 99.4% delivery SLA, +28% checkout completion, average latency dropped from 45s to 2.1s.
2. **High-Volume Multi-Store Shopify App for Gulf Merchants**:
   - *Problem*: Race conditions and inventory discrepancies across 3 Shopify storefronts during flash sales.
   - *Architecture*: Event-driven webhook synchronization engine with optimistic locking and BullMQ.
   - *Measurable Impact*: Zero overselling incidents in 12 months, 120,000 daily webhook events processed with sub-500ms latency.
3. **Enterprise SaaS Analytics Dashboard App Router Migration**:
   - *Problem*: 4.2MB client bundle taking 6.5s to load with frequent browser memory crashes.
   - *Architecture*: Next.js App Router migration with React Server Components, streaming SSR, and database aggregations.
   - *Measurable Impact*: 72% faster load (1.1s FCP), bundle size cut to 380KB.
