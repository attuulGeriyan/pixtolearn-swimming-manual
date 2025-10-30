# Deployment Guide

Complete guide for deploying the PixToLearn Swimming Manual application to production.

## Table of Contents

1. [MongoDB Atlas Setup](#mongodb-atlas-setup)
2. [Backend Deployment (Railway/Heroku)](#backend-deployment)
3. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Post-Deployment](#post-deployment)

---

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new organization (if prompted)

### Step 2: Create Cluster

1. Click "Build a Database"
2. Choose "Shared" (Free tier)
3. Select cloud provider and region (choose closest to your users)
4. Name your cluster (e.g., "pixtolearn-cluster")
5. Click "Create Cluster"

### Step 3: Configure Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add specific IPs for better security
5. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `myFirstDatabase` with `pixtolearn-manual`

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/pixtolearn-manual?retryWrites=true&w=majority
```

---

## Backend Deployment

### Option 1: Railway (Recommended - Easy)

#### Step 1: Prepare Backend

1. Ensure your `server/package.json` has start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

#### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your repository
6. Railway will auto-detect Node.js

#### Step 3: Configure Environment Variables

In Railway dashboard:
1. Go to "Variables" tab
2. Add the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pixtolearn-manual
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

#### Step 4: Deploy

1. Railway will automatically deploy
2. Click "Generate Domain" to get your backend URL
3. Note this URL for frontend configuration

### Option 2: Heroku

#### Step 1: Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login and Create App

```bash
heroku login
cd server
heroku create pixtolearn-api
```

#### Step 3: Set Environment Variables

```bash
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/pixtolearn-manual"
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN="https://your-frontend-domain.vercel.app"
```

#### Step 4: Deploy

```bash
git init
git add .
git commit -m "Initial deployment"
git push heroku main
```

#### Step 5: Seed Database

```bash
heroku run npm run seed
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended - Easy)

#### Step 1: Prepare Frontend

1. Update `client/.env`:
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

#### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure project:
   - **Framework Preset:** Create React App
   - **Root Directory:** client
   - **Build Command:** npm run build
   - **Output Directory:** build

#### Step 3: Add Environment Variables

In Vercel dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

#### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy automatically
3. You'll get a URL like `https://pixtolearn-manual.vercel.app`

#### Step 5: Update Backend CORS

Update your backend's CORS_ORIGIN to match your Vercel URL:
```
CORS_ORIGIN=https://pixtolearn-manual.vercel.app
```

### Option 2: Netlify

#### Step 1: Build Configuration

Create `client/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 2: Deploy

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Configure:
   - **Base directory:** client
   - **Build command:** npm run build
   - **Publish directory:** client/build

#### Step 3: Environment Variables

1. Go to "Site settings" → "Environment variables"
2. Add `REACT_APP_API_URL`

---

## Environment Configuration

### Production Environment Variables

#### Backend
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pixtolearn-manual
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### Frontend
```env
REACT_APP_API_URL=https://your-backend-domain.railway.app
```

---

## Post-Deployment

### 1. Seed Production Database

If using Railway:
```bash
# SSH into Railway container or use Railway CLI
railway run npm run seed
```

If using Heroku:
```bash
heroku run npm run seed
```

### 2. Test the Application

1. Visit your frontend URL
2. Test language selection
3. Test manual content loading
4. Test print functionality
5. Test on mobile devices

### 3. Set Up Custom Domain (Optional)

#### Vercel Custom Domain
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

#### Railway Custom Domain
1. Go to "Settings" → "Networking"
2. Add custom domain
3. Update DNS records

### 4. Enable HTTPS

Both Vercel and Railway provide automatic HTTPS. Ensure:
- URLs use `https://`
- Update environment variables with HTTPS URLs

### 5. Monitor Performance

#### Vercel Analytics
1. Enable in Vercel dashboard
2. Monitor page load times

#### MongoDB Atlas Monitoring
1. Check "Metrics" in Atlas dashboard
2. Monitor connection count
3. Set up alerts

### 6. Set Up CI/CD

Both platforms support automatic deployments:
- **Vercel:** Auto-deploys on git push to main
- **Railway:** Auto-deploys on git push
- **Netlify:** Auto-deploys on git push

---

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] MongoDB connection string is secure
- [ ] CORS is configured with specific origin (not *)
- [ ] Rate limiting is enabled
- [ ] HTTPS is enabled
- [ ] API keys are not exposed in frontend
- [ ] Database user has minimum required permissions

---

## Troubleshooting

### CORS Errors

Update backend CORS_ORIGIN to match exact frontend URL:
```javascript
// server/server.js
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true
};
```

### Database Connection Failed

1. Check MongoDB Atlas IP whitelist
2. Verify connection string format
3. Ensure password is URL-encoded (special characters)
4. Test connection string locally first

### Build Failures

1. Check Node.js version compatibility
2. Clear build cache
3. Check for missing dependencies
4. Review build logs

### Application Not Loading

1. Check browser console for errors
2. Verify API_URL is correct
3. Test API endpoint directly
4. Check network tab in DevTools

---

## Scaling Considerations

### Database
- Upgrade MongoDB Atlas tier for more storage
- Enable connection pooling
- Add indexes for better performance

### Backend
- Enable clustering in Node.js
- Use PM2 for process management
- Add Redis for caching

### Frontend
- Enable CDN caching
- Optimize images with WebP
- Implement lazy loading

---

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update
cd client && npm update
cd ../server && npm update
```

### Database Backups
- Enable automatic backups in MongoDB Atlas
- Schedule regular exports
- Test restore procedures

### Monitoring
- Set up error tracking (e.g., Sentry)
- Monitor server uptime
- Track API response times

---

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review error logs
3. Contact platform support
4. Email: hello@pixtolearn.com

---

## Cost Estimates

### Free Tier (Development)
- MongoDB Atlas: Free (512MB)
- Railway: Free ($5 credit/month)
- Vercel: Free (unlimited projects)
- **Total: Free**

### Production (Light Traffic)
- MongoDB Atlas: $9/month (Shared M2)
- Railway: $5-10/month
- Vercel: Free or $20/month (Pro)
- **Total: $14-39/month**

### Production (High Traffic)
- MongoDB Atlas: $57/month (Dedicated M10)
- Railway: $20-50/month
- Vercel: $20/month (Pro)
- **Total: $97-127/month**

---

Good luck with your deployment! 🚀
