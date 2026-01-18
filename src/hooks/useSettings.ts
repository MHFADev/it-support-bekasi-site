import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSettings = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (!error && data) {
        const settingsMap = data.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});
        setSettings(settingsMap);
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
