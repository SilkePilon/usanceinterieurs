# Security & Environment Configuration

This document outlines the security improvements made to the Usance Interieurs project by moving hardcoded values to environment variables.

## 🔒 **Security Improvements Made**

### **1. Sentry Configuration**
All Sentry-related secrets are now properly configured through environment variables:
- `SENTRY_DSN` - Your Sentry project Data Source Name
- `SENTRY_ORG` - Your Sentry organization slug  
- `SENTRY_PROJECT` - Your Sentry project slug
- `SENTRY_AUTH_TOKEN` - Authentication token for source map uploads

### **2. Site Configuration**
Website URLs and contact information are now configurable:
- `NEXT_PUBLIC_SITE_URL` - Base URL for the website
- `NEXT_PUBLIC_COMPANY_EMAIL` - Company email address

### **3. Social Media Links**
All social media URLs are now environment-configurable:
- `NEXT_PUBLIC_FACEBOOK_URL` - Facebook page URL
- `NEXT_PUBLIC_INSTAGRAM_URL` - Instagram profile URL  
- `NEXT_PUBLIC_LINKEDIN_URL` - LinkedIn profile URL

## 📁 **Files Modified**

### **Environment Configuration**
- `.env.example` - Updated with all required environment variables

### **Core Application Files**
- `src/app/layout.js` - Updated metadata, structured data, and contact info
- `next.config.mjs` - Sentry configuration using environment variables

### **Sentry Integration Files**
- `sentry.client.config.js` - Client-side Sentry configuration
- `sentry.server.config.js` - Server-side Sentry configuration  
- `sentry.edge.config.js` - Edge runtime Sentry configuration
- `instrumentation.js` - Next.js instrumentation file

### **Component Files**
- `src/lib/fackData/teamData.js` - Social media links using env vars
- `src/components/section/instagramSlider.jsx` - Instagram URL from env
- `src/components/header/mobileNavbar.jsx` - Email address from env
- `src/components/header/bottomNavbar.jsx` - Email address from env

## 🛠️ **Setup Instructions**

### **1. Create Environment File**
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### **2. Configure Sentry**
1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Create a new Next.js project
3. Copy your DSN, organization, and project values
4. Optionally create an auth token for source map uploads

### **3. Set Environment Variables**
Edit `.env.local` with your actual values:
```env
# Sentry Configuration
SENTRY_DSN=https://your-actual-dsn@sentry.io/project-id
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
SENTRY_AUTH_TOKEN=your-auth-token

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_COMPANY_EMAIL=your-email@domain.com

# Social Media Links
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/your-page
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your-profile
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile

# Environment
NODE_ENV=production
```

### **4. Production Deployment**
For production deployment, set these environment variables in your hosting platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables  
- **Other hosts**: Follow their specific documentation

## 🔐 **Security Best Practices Implemented**

### **✅ Environment Variable Usage**
- All sensitive data moved from code to environment variables
- Fallback values provided for development
- Clear separation between public and private variables

### **✅ Proper Variable Naming**
- `NEXT_PUBLIC_*` prefix for client-side accessible variables
- No prefix for server-only variables (like auth tokens)

### **✅ Documentation**
- Comprehensive `.env.example` file
- Clear setup instructions
- Security guidelines documented

### **✅ Git Security**
- `.env.local` should be in `.gitignore` (verify this)
- Only example files committed to repository
- No hardcoded secrets in codebase

## ⚠️ **Important Security Notes**

### **Never Commit Secrets**
- Never commit `.env.local` or actual environment values
- Always use `.env.example` for documentation
- Review commits for accidentally included secrets

### **Environment Variable Types**
- **`NEXT_PUBLIC_*`**: Exposed to browser - use for non-sensitive data only
- **Regular env vars**: Server-side only - safe for sensitive data like API keys

### **Production Considerations**
- Use different values for development/staging/production
- Regularly rotate authentication tokens
- Monitor Sentry for unauthorized access attempts

## 🧪 **Testing the Configuration**

1. **Start development server**: `npm run dev`
2. **Test Sentry integration**: Visit `/sentry-test` and click test buttons
3. **Verify environment variables**: Check that social links and email work correctly
4. **Check Sentry dashboard**: Confirm errors are being logged

## 📞 **Support**

If you need help configuring any of these environment variables:
1. Check the service provider's documentation (Sentry, hosting platform, etc.)
2. Refer to the setup guides in `SENTRY_SETUP.md`
3. Ensure all environment variables are properly set in your deployment platform
