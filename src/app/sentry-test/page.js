'use client';

import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sentry Integration Test</h1>
      
      <div className="space-y-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => {
            throw new Error("This is a test error for Sentry!");
          }}
        >
          Throw Client-side Error
        </button>
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            Sentry.captureMessage("This is a test message from Sentry!", "info");
          }}
        >
          Send Test Message
        </button>
        
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => {
            Sentry.captureException(new Error("This is a captured exception!"));
          }}
        >
          Capture Exception
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Testing Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Make sure you have set up your Sentry DSN in your environment variables</li>
          <li>Click any of the buttons above to test different types of Sentry logging</li>
          <li>Check your Sentry dashboard to see if the errors/messages appear</li>
          <li>Remove this test page before deploying to production</li>
        </ol>
      </div>
    </div>
  );
}
