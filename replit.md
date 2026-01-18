# IT Support Bekasi - Premium Enterprise IT Solutions

## Overview
This is a React + TypeScript + Vite web application for IT Support Bekasi, an IT services company based in Bekasi, Indonesia. The website showcases laptop and PC repair services, maintenance, upgrades, and sales.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN in HTML + PostCSS integration)
- **Animation**: Framer Motion
- **UI Components**: Lucide React icons, custom components with shadcn/ui patterns
- **Backend Integration**: Supabase (for data storage)
- **Image Hosting**: Cloudinary

## Project Structure
```
/
├── index.html          # Main HTML entry point
├── index.tsx           # React entry point
├── App.tsx             # Main App component
├── components/         # React components
├── src/
│   ├── lib/           # Utility libraries (Supabase, Cloudinary, utils)
│   └── hooks/         # Custom React hooks
├── constants.tsx       # Application constants
├── types.ts           # TypeScript type definitions
├── vite.config.ts     # Vite configuration
├── tailwind.config.cjs # Tailwind configuration
└── postcss.config.cjs  # PostCSS configuration
```

## Development
- **Dev Server**: `npm run dev` - Runs on port 5000
- **Build**: `npm run build` - Creates production build in `dist/`
- **Preview**: `npm run preview` - Preview production build

## Environment Variables
The project uses environment variables for:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_CLOUDINARY_UPLOAD_PRESET` - Cloudinary upload preset
- `VITE_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `VITE_BLINK_PROJECT_ID` - Blink project ID
- `VITE_BLINK_PUBLISHABLE_KEY` - Blink publishable key

## Deployment
Configured for static deployment with Vite build output in `dist/` directory.
