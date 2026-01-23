import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { blink } from '../lib/blink';
import { 
  Package, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  MessageSquare,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Globe,
  Monitor,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardCharts } from './DashboardCharts';

interface RecentProduct {
  id: string;
  title: string;
  price: number;
  created_at: string;
  image_url: string;
}

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
  status: string;
}

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, isUpdated }: any) => (
  <motion.div 
    className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm relative overflow-hidden"
    animate={isUpdated ? { scale: [1, 1.02, 1] } : {}}
    transition={{ duration: 0.3 }}
  >
    {isUpdated && (
      <motion.div 
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-primary/10"
      />
    )}
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      {trendValue && (
        <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          <span>{trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}</span>
          <span className="font-medium">{trendValue}</span>
        </div>
      )}
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</p>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    messages: 0,
    activeUsers: 0,
    totalViews: 0
  });
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [topReferrers, setTopReferrers] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [statsUpdated, setStatsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Supabase stats
      const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
      
      // Use set for unique categories from products table since there is no separate categories table
      const { data: catData } = await supabase.from('products').select('category');
      const uniqueCategories = new Set(catData?.map(p => p.category).filter(Boolean)).size;

      // Blink DB stats
      const messageCount = await blink.db.contactMessages.count();
      const viewsCount = await blink.db.pageViews.count();
      
      // Fetch chart data (last 7 days)
      const views = await blink.db.pageViews.list({
        orderBy: { createdAt: 'desc' },
        limit: 1000
      });

      // Group views by date
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      const groupedViews = last7Days.map(date => ({
        date: new Date(date).toLocaleDateString('id-ID', { weekday: 'short' }),
        views: views.filter(v => (v.createdAt as string).startsWith(date)).length
      }));

      setChartData(groupedViews);

      // Top Referrers
      const referrers = views.reduce((acc: any, curr: any) => {
        let ref = 'Direct';
        try {
          if (curr.referrer && curr.referrer !== 'direct') {
            ref = new URL(curr.referrer).hostname;
          }
        } catch (e) {
          ref = curr.referrer || 'Direct';
        }
        acc[ref] = (acc[ref] || 0) + 1;
        return acc;
      }, {});

      const sortedReferrers = Object.entries(referrers)
        .map(([name, count]) => ({ name, count }))
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 5);

      setTopReferrers(sortedReferrers);
      
      setStats({
        products: productCount || 0,
        categories: uniqueCategories || 0,
        messages: messageCount || 0,
        totalViews: viewsCount || 0,
        activeUsers: stats.activeUsers // Presence handles this
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentData = async () => {
    try {
      // Recent products from Supabase
      const { data: prods } = await supabase
        .from('products')
        .select('id, title, price, created_at, image_url')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentProducts(prods || []);

      // Recent messages from Blink DB
      const msgs = await blink.db.contactMessages.list({
        orderBy: { createdAt: 'desc' },
        limit: 5
      }) as any[];
      setRecentMessages(msgs || []);
    } catch (err) {
      console.error('Error fetching recent data:', err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentData();

    // Setup realtime presence for "Active Now"
    const channel = blink.realtime.channel('global-presence');
    channel.onPresence((users: any[]) => {
      setStats(prev => ({ ...prev, activeUsers: users.length }));
    });
    
    // Subscribe to products change
    const supabaseChannel = supabase
      .channel('dashboard-products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchStats();
        fetchRecentData();
        setStatsUpdated(true);
        setTimeout(() => setStatsUpdated(false), 1000);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(supabaseChannel);
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Analitik real-time untuk IT Support Bekasi.</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full border border-green-500/20">
          <Activity size={18} className="animate-pulse" />
          <span className="text-sm font-bold">{stats.activeUsers} Pengunjung Aktif</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Produk" 
          value={stats.products} 
          icon={Package} 
          trend="up" 
          trendValue="+4" 
          color="bg-primary"
          isUpdated={statsUpdated}
        />
        <StatCard 
          title="Total Kunjungan" 
          value={stats.totalViews.toLocaleString()} 
          icon={TrendingUp} 
          trend="up" 
          trendValue="18%" 
          color="bg-indigo-500"
        />
        <StatCard 
          title="Pesan Masuk" 
          value={stats.messages} 
          icon={MessageSquare} 
          trend="up" 
          trendValue="+2" 
          color="bg-pink-500" 
        />
        <StatCard 
          title="Kategori Produk" 
          value={stats.categories} 
          icon={Globe} 
          color="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] border border-gray-100 dark:border-dark-border shadow-sm">
            <DashboardCharts data={chartData} title="Traffic Kunjungan (7 Hari Terakhir)" />
          </div>

          <div className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] border border-gray-100 dark:border-dark-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Produk Terbaru</h3>
              <RefreshCw size={18} className={`text-gray-400 ${statsUpdated ? 'animate-spin' : ''}`} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100 dark:border-dark-border">
                    <th className="pb-4 font-bold">Produk</th>
                    <th className="pb-4 font-bold">Kategori</th>
                    <th className="pb-4 font-bold">Harga</th>
                    <th className="pb-4 font-bold">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentProducts.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 dark:border-dark-bg/50 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img src={p.image_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-medium">{p.title}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500">Hardware</td>
                      <td className="py-4 font-bold">Rp {p.price.toLocaleString()}</td>
                      <td className="py-4 text-gray-400">{new Date(p.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] border border-gray-100 dark:border-dark-border shadow-sm">
            <h3 className="text-xl font-bold mb-6">Sumber Trafik</h3>
            <div className="space-y-4">
              {topReferrers.map((ref, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
                      <Globe size={14} className="text-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{ref.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-500">{ref.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] border border-gray-100 dark:border-dark-border shadow-sm">
            <h3 className="text-xl font-bold mb-6">Pesan Terbaru</h3>
            <div className="space-y-6">
              {recentMessages.length > 0 ? recentMessages.map((m) => (
                <div key={m.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm truncate">{m.name}</p>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">{new Date(m.created_at as string).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{m.message}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">Belum ada pesan masuk.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-[2.5rem] shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xl font-bold mb-2 relative z-10">Upgrade Sistem?</h3>
            <p className="text-white/80 text-sm mb-6 relative z-10">Kelola katalog Anda dengan lebih efisien menggunakan fitur premium.</p>
            <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all relative z-10">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
