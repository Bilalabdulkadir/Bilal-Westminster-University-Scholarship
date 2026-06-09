# ⚡ Bilal Abdulkadir Muhammed | Professional Portfolio & Academic Dossier

A high-performance, polished, and fully responsive digital portfolio and academic credentials dossier for **Bilal Abdulkadir Muhammed** (IT Operations & Data Specialist).

Designed for showcasing technical competencies, certified skills, interactive project galleries, and a high-fidelity academic dossier. Built with **React 18**, **Vite**, **TypeScript**, and **Tailwind CSS**, featuring custom live-scannable QR code generation, real-time Firestore persistence, and pixel-perfect local PDF rendering.

---

## 🎨 Visual Identity & Aesthetic Choices

This application is tailored to project professional rigor, clarity, and tech-forward sophistication:
- **Typography Pairing**: Elegant display headers in **Plus Jakarta Sans**, coupled with **DM Serif Display** for title screens and **JetBrains Mono** for code/data metrics.
- **Custom Color Palette**: Framed in clean slate gray contrast (`#0f172a`), accented with electric cobalt (`#2563eb`) to direct focus, and crisp off-white borders.
- **Interactive Favicon**: Incorporates a built-in terminal shell SVG icon `<svg>` embedded directly as a data-URI in the HTML structure.

---

## ✨ Features and Architecture

### 1. 📂 Academic & Professional Credentials Dossier
An integrated, beautifully designed review of Bilal's readiness for the **Kaplan Pre-Master's Program** (progressing to **Westminster MA in Artificial Intelligence, Data & Communication**). Includes:
- Academic context (Adama Science and Technology University - ASTU).
- 4+ years of combined IT Systems Support & Database Administration experience.
- Full gaps/travel justifications and personal statements.

### 2. 📄 High-Quality Client-Side PDF Generation
Features built-in client-side rendering with **html2canvas** + **jsPDF**:
- High-fidelity preservation of font faces, borders, and margins.
- Elevated standard resolution (Scale-2) rendering for razor-sharp vector output.
- Instant, non-blocking asynchronous generation with clear load states.
- Automated pagination and multi-page layout optimization.

### 3. 🔍 Live Dynamic QR Code Hub
Features an interactive screen-level **QR Code Generator Hub** that lets readers instantly transfer information to their mobile devices:
- **Standard vCard 3.0**: Select this to scan directly and add Bilal's clean professional contact details directly into a mobile address book.
- **LinkedIn Profile Link**: Easily navigate to Bilal's official LinkedIn profile.
- **GitHub Repository Link**: View backend and client-side source code.
- **Twitter / X Profile Link**: Link directly to [x.com/imrbil27](https://x.com/imrbil27).
- **Instagram Handle Link**: Link to [instagram.com/bilal.tech27](https://www.instagram.com/bilal.tech27?igsh=emlvdmpweGY3eW1p).

### 4. 🔒 Secure Cloud Integrity (Firebase & Firestore)
Durable database integrations for persistent messaging and preference synchronization:
- Built-in secure user validation modal.
- Active contact forms storing submissions directly inside Firestore.
- Configured rulesets for data isolation and privacy protection.

---

## 🛠️ Technology Stack

- **Client Runtime**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Interactions & Transitions**: Motion (`motion/react`)
- **Icons**: Lucide React
- **Engine Plugins**:
  - `jspdf` for document synthesis
  - `html2canvas` for precise layout-to-raster execution
  - `firebase` for instant clouds and database state

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v18 or higher) installed.

### Installation

1. Install package dependencies:
   ```bash
   npm install
   ```

2. Generate or duplicate your `.env` configuration template (using your Firestore database credentials):
   ```bash
   cp .env.example .env
   ```

### Running Locally

To load the development server on `http://localhost:3000`:
```bash
npm run dev
```

### Building for Production

Compile the production-ready build to the static `dist/` folder:
```bash
npm run build
```

Verify your TypeScript types and formatting with the built-in linter code validation:
```bash
npm run lint
```
