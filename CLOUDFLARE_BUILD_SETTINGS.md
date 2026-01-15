# Cloudflare Pages Build Settings Fix

## The Problem
Cloudflare Pages is running `npm run dev` (development server) instead of `npm run build` (production build), which causes it to hang forever.

## The Solution

Go to your Cloudflare Pages project settings and update:

### Build Settings:
1. **Framework preset**: Leave empty or select "None"
2. **Build command**: `npm run build`
3. **Build output directory**: `.svelte-kit/cloudflare`
4. **Root directory**: `/` (leave empty)

### Steps:
1. Go to Cloudflare Dashboard → Pages → **wedding-1** project
2. Click **Settings** → **Builds & deployments**
3. Click **Edit configuration**
4. Update:
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
5. Click **Save**
6. Go to **Deployments** tab and click **Retry deployment** on the failed build

The build should now complete in ~30-60 seconds instead of hanging forever!





