# Sentry Integration Setup

This project has been configured with Sentry for error tracking and performance monitoring.

## Setup Instructions

### 1. Create a Sentry Account and Project

1. Go to [sentry.io](https://sentry.io) and create an account
2. Create a new project and select "Next.js" as the platform
3. Copy your DSN from the project settings

### 2. Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
SENTRY_DSN=your_sentry_dsn_here
SENTRY_ORG=your_sentry_org_slug
SENTRY_PROJECT=your_sentry_project_slug
SENTRY_AUTH_TOKEN=your_sentry_auth_token (optional, for source maps)
```

To get these values:
- **SENTRY_DSN**: Found in your Sentry project settings under "Client Keys (DSN)"
- **SENTRY_ORG**: Your organization slug (visible in your Sentry URL)
- **SENTRY_PROJECT**: Your project slug (visible in your Sentry URL)
- **SENTRY_AUTH_TOKEN**: Create in User Settings > Auth Tokens (needed for source map uploads)

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Visit `/sentry-test` to test the integration
3. Click the test buttons to generate different types of errors
4. Check your Sentry dashboard to confirm errors are being logged

### 4. Configuration Files

The following files have been added/modified for Sentry integration:

- `sentry.client.config.js` - Client-side Sentry configuration
- `sentry.server.config.js` - Server-side Sentry configuration  
- `sentry.edge.config.js` - Edge runtime Sentry configuration
- `instrumentation.js` - Next.js instrumentation file
- `next.config.mjs` - Updated with Sentry webpack plugin
- `src/app/global-error.js` - Global error boundary
- `src/app/sentry-test/page.js` - Test page (remove before production)

### 5. Customization

You can customize Sentry settings in the config files:

- **Sample Rate**: Adjust `tracesSampleRate` to control performance monitoring sampling
- **Debug Mode**: Set `debug: true` during development for verbose logging
- **Session Replay**: Configure replay settings in `sentry.client.config.js`
- **Filters**: Add beforeSend hooks to filter out unwanted errors

### 6. Production Deployment

Before deploying to production:

1. Set your environment variables in your hosting platform
2. Remove or hide the `/sentry-test` page
3. Adjust sample rates for production traffic
4. Consider setting up release tracking for better error attribution

## Usage in Code

### Capturing Errors Manually

```javascript
import * as Sentry from "@sentry/nextjs";

// Capture an exception
Sentry.captureException(new Error("Something went wrong"));

// Capture a message
Sentry.captureMessage("User performed an action", "info");

// Add user context
Sentry.setUser({ id: "123", email: "user@example.com" });

// Add custom tags
Sentry.setTag("page.locale", "en-us");
```

### Error Boundaries

Sentry automatically captures unhandled errors, but you can also create custom error boundaries:

```javascript
import * as Sentry from "@sentry/nextjs";

export default function MyErrorBoundary({ children }) {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog>
      {children}
    </Sentry.ErrorBoundary>
  );
}
```

## Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry React Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Session Replay](https://docs.sentry.io/product/session-replay/)
