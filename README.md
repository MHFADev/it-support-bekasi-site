# IT Support Bekasi - Professional IT Solutions

A professional IT solutions web app for Bekasi, Indonesia, offering laptop & PC services, hardware sales, real-time catalog with admin panel, Supabase integration, and cloud image uploads.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Then edit .env.local with your actual credentials

# Start development server
npm run dev
```

Visit `http://localhost:5000`

## 📦 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Storage**: Cloudinary
- **Analytics**: Blink SDK
- **UI Components**: Shadcn/ui, Framer Motion
- **Routing**: React Router v7

## 🌐 Deployment

### Vercel (Recommended)

Complete deployment guide available in [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

Quick steps:
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

Your app will be live at `https://your-project.vercel.app`

### Environment Variables

Required for deployment:

```bash
VITE_SUPABASE_URL=          # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=     # Your Supabase anon key
VITE_CLOUDINARY_CLOUD_NAME= # Your Cloudinary cloud name
VITE_CLOUDINARY_UPLOAD_PRESET= # Your Cloudinary upload preset
VITE_BLINK_PROJECT_ID=      # Your Blink project ID
VITE_BLINK_PUBLISHABLE_KEY= # Your Blink publishable key
```

See [.env.example](./.env.example) for the template.

## 📁 Project Structure

```
src/
├── admin/              # Admin panel components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Products.tsx    # Product management
│   └── Settings.tsx    # Settings panel
├── components/         # Reusable UI components
│   ├── ui/            # Shadcn components
│   └── ...            # Feature components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configs
│   ├── supabase.ts    # Supabase client
│   └── blink.ts       # Blink SDK client
└── App.tsx            # Main app component
```

## 🛠️ Available Scripts

```bash
npm run dev        # Start dev server (port 5000)
npm run build      # Build for production
npm run preview    # Preview production build
npm run typecheck  # Run TypeScript type checking
```

## 📚 Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md) - Complete deployment instructions
- [Setup Guide](./SETUP_GUIDE.md) - Initial project setup
- [Testing Guide](./TESTING_GUIDE.md) - Testing procedures
- [Database Schema](./DATABASE.md) - Database structure

## 🔒 Security

- All sensitive keys use `VITE_` prefix (client-safe)
- Security headers configured in `vercel.json`
- CORS policies enforced
- XSS protection enabled

## 📄 License

Created with [Blink](https://blink.new)

## 🤝 Support

For deployment issues or questions:
- Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ for IT Support Bekasi
