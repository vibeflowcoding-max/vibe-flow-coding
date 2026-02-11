<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vibe Flow Coding Portal

A high-end sales portal for **Vibe Flow Coding**, specializing in AI agents, automations, and intelligent business systems. Built with React, TypeScript, and Vite.

## Project Structure

```
├── index.html              # Entry HTML
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies & scripts
├── .env.local               # Environment variables (not tracked)
└── src/
    ├── main.tsx             # App entry point
    ├── App.tsx              # Main application component
    ├── components/
    │   ├── BrandLogo.tsx    # SVG brand logo component
    │   ├── Navbar.tsx       # Navigation bar with language toggle
    │   └── ChatWidget.tsx   # AI chat assistant widget
    ├── services/
    │   └── geminiService.ts # Gemini AI integration
    ├── i18n/
    │   └── translations.ts  # ES/EN translations
    └── types/
        └── index.ts         # TypeScript interfaces
```

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)
