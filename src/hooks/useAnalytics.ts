import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { blink } from '../lib/blink';

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const trackView = async () => {
      try {
        const referrer = document.referrer;
        const urlParams = new URLSearchParams(window.location.search);
        const utm_source = urlParams.get('utm_source') || (referrer.includes('google') ? 'google' : 'direct');
        
        // Log to Blink's built-in analytics
        blink.analytics.log('page_view', {
          path: location.pathname,
          referrer,
          utm_source
        });

        // Also save to our custom table for the dashboard graphs
        await blink.db.pageViews.create({
          id: crypto.randomUUID(),
          path: location.pathname,
          referrer,
          browser: navigator.userAgent,
          device: window.innerWidth < 768 ? 'mobile' : 'desktop'
        });
      } catch (error) {
        console.error('Analytics error:', error);
      }
    };

    trackView();
  }, [location.pathname]);
}
