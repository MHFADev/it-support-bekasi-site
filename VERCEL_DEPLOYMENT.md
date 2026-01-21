# Vercel Deployment Guide - IT Support Bekasi

## Prerequisites

- GitHub account connected to Vercel
- Vercel account (free tier is sufficient)
- This repository pushed to GitHub

## Quick Deployment Steps

### 1. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `MHFADev/it-support-bekasi-site`
4. Vercel will auto-detect the Vite framework

### 2. Configure Environment Variables

In Vercel project settings, add these environment variables:

#### Required Variables

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://uriknixrbjyzlzvsdmrq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaWtuaXhyYmp5emx6dnNkbXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTA0NzUsImV4cCI6MjA4NDE2NjQ3NX0.2WAelL9rnsPNBnCMXBE4IEYgXvQJJoGdyNgt1cR7lJI

# Cloudinary Configuration (for image uploads)
VITE_CLOUDINARY_CLOUD_NAME=dcfycfrbw
VITE_CLOUDINARY_UPLOAD_PRESET=velvel

# Blink Configuration
VITE_BLINK_PROJECT_ID=itsupport-bekasi-site-4z5i19dr
VITE_BLINK_PUBLISHABLE_KEY=blnk_pk_3NAxvMgESZOF_q-G8ZVQSvKUyLHCRjGN
```

#### Optional Variables (Backend Only - Do NOT add to Vercel)

```bash
# These should NEVER be exposed in the frontend
SUPABASE_SERVICE_ROLE_KEY=<keep_secret>
```

### 3. Build Configuration

Vercel will automatically use the settings from `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

If you need to override, use these settings in Vercel dashboard:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Run TypeScript compilation
3. Build the Vite project
4. Deploy to production

## Post-Deployment Steps

### 1. Update Supabase URL Whitelist

Add your Vercel domain to Supabase allowed URLs:

1. Go to [Supabase Dashboard](https://app.supabase.com/project/uriknixrbjyzlzvsdmrq)
2. Navigate to Authentication → URL Configuration
3. Add your Vercel URLs:
   - `https://your-project.vercel.app`
   - `https://your-custom-domain.com` (if using custom domain)

### 2. Update CORS Settings (if using API)

If you have backend APIs, whitelist your Vercel domain.

### 3. Test Core Features

After deployment, verify:
- ✅ Homepage loads correctly
- ✅ Products display from Supabase
- ✅ Admin login works
- ✅ Image uploads to Cloudinary work
- ✅ Contact form submissions save to database
- ✅ All routing works (no 404 errors)

## Domain Configuration

### Using Custom Domain

1. Go to Vercel Project Settings → Domains
2. Add your custom domain (e.g., `itsupport-bekasi.com`)
3. Configure DNS records as instructed by Vercel
4. Update environment variables if domain-specific

### SSL Certificate

Vercel automatically provisions SSL certificates for all domains (including custom domains).

## Troubleshooting

### Build Fails with TypeScript Errors

The build process skips TypeScript type checking for faster deployments. However, you should run type checking locally:

```bash
# Run locally to check errors
npm run typecheck
```

Fix any TypeScript errors before production deployment for better code quality. The build will still succeed even with type errors, but it's recommended to fix them.

**Note**: Current build is configured to deploy even with TypeScript warnings to ensure deployment success. For production-ready code, resolve all type errors.

### Environment Variables Not Working

1. Ensure all variables start with `VITE_` prefix (for Vite apps)
2. Redeploy after adding environment variables
3. Check variable names match exactly (case-sensitive)

### 404 on Page Refresh

This is already handled by `vercel.json` rewrites. If still happening:
1. Verify `vercel.json` is in root directory
2. Check that routes are configured correctly

### Images Not Loading

1. Verify Cloudinary credentials are correct
2. Check browser console for CORS errors
3. Ensure Cloudinary upload preset allows unsigned uploads

### Supabase Connection Issues

1. Check Supabase URL and anon key are correct
2. Verify Vercel domain is whitelisted in Supabase
3. Check network tab for failed requests

## Optimization Tips

### 1. Enable Analytics

Vercel provides built-in analytics:
- Go to Project Settings → Analytics
- Enable Web Analytics

### 2. Configure Caching

Already configured in `vercel.json`:
- Assets cached for 1 year
- HTML files revalidated on each request

### 3. Enable Speed Insights

```bash
npm install @vercel/speed-insights
```

Then add to `main.tsx`:
```typescript
import { SpeedInsights } from '@vercel/speed-insights/react';

// Add to your app
<SpeedInsights />
```

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests and other branches

### Branch Configuration

In Vercel Project Settings → Git:
- Production Branch: `main`
- Auto-deploy: Enabled

## Monitoring

### Build Logs

View real-time build logs:
1. Go to Vercel Dashboard
2. Select your project
3. Click on latest deployment
4. View "Building" logs

### Runtime Logs

Check function execution and errors:
1. Go to Project → Logs
2. Filter by time range and log level

## Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Project Issues: Contact your development team

## Checklist Before Going Live

- [ ] All environment variables configured
- [ ] Supabase URL whitelist updated
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Admin panel accessible
- [ ] Image uploads working
- [ ] Analytics enabled
- [ ] Contact information updated

---

**Deployment Date**: January 2026
**Framework**: Vite + React + TypeScript
**Hosting**: Vercel
**Database**: Supabase
**Storage**: Cloudinary
