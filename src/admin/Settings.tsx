import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Save, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Type,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) {
      toast.error('Gagal mengambil pengaturan');
    } else {
      const settingsMap = data?.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      setSettings(settingsMap || {});
    }
    setLoading(false);
  };

  const handleUpdateSetting = async (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase.from('site_settings').upsert(updates);
      if (error) throw error;
      toast.success('Pengaturan berhasil disimpan');
    } catch (error: any) {
      toast.error('Gagal menyimpan pengaturan');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Pengaturan Web</h1>
          <p className="text-gray-500 dark:text-gray-400">Ubah konten utama website Anda secara langsung.</p>
        </div>
        <button 
          onClick={saveSettings}
          disabled={isSaving}
          className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Simpan Perubahan</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-brand-500 font-bold mb-4">
            <Type size={20} />
            <h3>Halaman Utama (Hero)</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Judul Utama (H1)</label>
              <input 
                type="text" 
                value={settings.hero?.title || ''}
                onChange={(e) => handleUpdateSetting('hero', { ...settings.hero, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Sub-judul</label>
              <textarea 
                rows={2}
                value={settings.hero?.subtitle || ''}
                onChange={(e) => handleUpdateSetting('hero', { ...settings.hero, subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">URL Gambar Hero</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={settings.hero?.image || ''}
                  onChange={(e) => handleUpdateSetting('hero', { ...settings.hero, image: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
                <div className="w-12 h-10 rounded-lg overflow-hidden border border-gray-200">
                  <img src={settings.hero?.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-brand-500 font-bold mb-4">
            <Phone size={20} />
            <h3>Informasi Kontak</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Phone size={14} /> WhatsApp
              </label>
              <input 
                type="text" 
                value={settings.contact?.whatsapp || ''}
                onChange={(e) => handleUpdateSetting('contact', { ...settings.contact, whatsapp: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <input 
                type="email" 
                value={settings.contact?.email || ''}
                onChange={(e) => handleUpdateSetting('contact', { ...settings.contact, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <MapPin size={14} /> Alamat Kantor
              </label>
              <input 
                type="text" 
                value={settings.contact?.address || ''}
                onChange={(e) => handleUpdateSetting('contact', { ...settings.contact, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
