import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { blink } from '../lib/blink';

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const trackView = async () => {
      const referrer = document.referrer;
      const urlParams = new URLSearchParams(window.location.search);
      const utm_source = urlParams.get('utm_source') || (referrer.includes('google') ? 'google' : 'direct');
      
      // Log to Blink's built-in analytics (fire-and-forget, don't await)
      // This is non-critical and may fail due to network issues
      try {
        blink.analytics.log('page_view', {
          path: location.pathname,
          referrer,
          utm_source
        });
      } catch {
        // Silently ignore analytics errors - they're non-critical
      }

      // Also save to our custom table for the dashboard graphs via Edge Function (to bypass RLS)
      try {
        await blink.functions.invoke('track-view', {
          body: JSON.stringify({
            id: crypto.randomUUID(),
            path: location.pathname,
            referrer,
            browser: navigator.userAgent,
            device: window.innerWidth < 768 ? 'mobile' : 'desktop'
          })
        });
      } catch {
        // Silently ignore edge function errors - they're non-critical for page load
      }
    };

    trackView();
  }, [location.pathname]);
}
