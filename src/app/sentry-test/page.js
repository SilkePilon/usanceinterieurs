'use client';

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function SentryTestPage() {
  const [status, setStatus] = useState('');
  const [config, setConfig] = useState(null);

  const checkSentryConfig = () => {
    try {
      // Get current client
      const client = Sentry.getCurrentScope().getClient();
      const dsn = client?.getDsn();
      
      setConfig({
        clientExists: !!client,
        dsnExists: !!dsn,
        dsnHost: dsn?.host || 'Not found',
        environment: process.env.NODE_ENV,
        sentryDsn: process.env.SENTRY_DSN ? 'Set (hidden for security)' : 'Not set'
      });
    } catch (error) {
      setConfig({ error: error.message });
    }
  };

  const testError = async (type) => {
    setStatus(`Testing ${type}...`);
    
    try {
      switch (type) {
        case 'throw':
          throw new Error("Test error thrown from Sentry test page");
        
        case 'capture':
          const eventId = Sentry.captureException(new Error("Test captured exception"));
          setStatus(`Captured exception with ID: ${eventId}`);
          break;
        
        case 'message':
          const msgId = Sentry.captureMessage("Test message from Sentry test page", "info");
          setStatus(`Sent message with ID: ${msgId}`);
          break;
        
        case 'user':
          Sentry.setUser({ id: "test-user", email: "test@example.com" });
          const userEventId = Sentry.captureMessage("Test message with user context", "info");
          setStatus(`Set user context and sent message with ID: ${userEventId}`);
          break;
      }
    } catch (error) {
      setStatus(`Error occurred: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Sentry Integration Diagnostics</h1>
      
      {/* Configuration Check */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Configuration Check</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={checkSentryConfig}
        >
          Check Sentry Configuration
        </button>
        
        {config && (
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold mb-2">Configuration Status:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Test Buttons */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Sentry Tests</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => testError('throw')}
          >
            1. Throw Error (Unhandled)
          </button>
          
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => testError('capture')}
          >
            2. Capture Exception
          </button>
          
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => testError('message')}
          >
            3. Send Message
          </button>
          
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => testError('user')}
          >
            4. Test with User Context
          </button>
        </div>
        
        {status && (
          <div className="mt-4 p-3 bg-white rounded border">
            <strong>Status:</strong> {status}
          </div>
        )}
      </div>

      {/* Troubleshooting Guide */}
      <div className="p-4 bg-yellow-50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Guide</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold">1. Check Environment Variables in Vercel:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Go to your Vercel project dashboard</li>
              <li>Navigate to Settings → Environment Variables</li>
              <li>Ensure <code className="bg-gray-200 px-1 rounded">SENTRY_DSN</code> is set correctly</li>
              <li>Redeploy after adding environment variables</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">2. Verify Sentry DSN:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Format should be: <code className="bg-gray-200 px-1 rounded">https://key@ingest.sentry.io/project-id</code></li>
              <li>Check your Sentry project settings for the correct DSN</li>
              <li>Ensure the project is not paused or disabled</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">3. Check Sentry Project:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Log into your Sentry dashboard</li>
              <li>Check if the project exists and is active</li>
              <li>Verify the DSN in Project Settings → Client Keys</li>
              <li>Check rate limits and quotas</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">4. Network Issues:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Check browser console for network errors</li>
              <li>Verify no ad blockers are blocking Sentry requests</li>
              <li>Check if your hosting provider blocks external requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
