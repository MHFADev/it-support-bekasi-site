import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Package, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecentProduct {
  id: string;
  title: string;
  price: number;
  created_at: string;
  image_url: string;
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
        className="absolute inset-0 bg-green-500/10"
      />
    )}
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        <span>{trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}</span>
        <span className="font-medium">{trendValue}</span>
      </div>
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</p>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
  });
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [statsUpdated, setStatsUpdated] = useState(false);

  const fetchStats = async () => {
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
    
    setStats({
      products: productCount || 0,
      categories: categoryCount || 0,
    });
  };

  const fetchRecentProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('id, title, price, created_at, image_url')
      .order('created_at', { ascending: false })
      .limit(5);
    
    setRecentProducts(data || []);
  };

  useEffect(() => {
    fetchStats();
    fetchRecentProducts();

    // Setup realtime subscription for products
    const channel = supabase
      .channel('dashboard-products')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          // Refresh stats and recent products on any change
          fetchStats();
          fetchRecentProducts();
          setStatsUpdated(true);
          setTimeout(() => setStatsUpdated(false), 1000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Ringkasan performa toko dan layanan IT Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Produk" 
          value={stats.products} 
          icon={Package} 
          trend="up" 
          trendValue="12%" 
          color="bg-brand-500"
          isUpdated={statsUpdated}
        />
        <StatCard 
          title="Kategori" 
          value={stats.categories} 
          icon={TrendingUp} 
          trend="up" 
          trendValue="5%" 
          color="bg-orange-500"
          isUpdated={statsUpdated}
        />
        <StatCard 
          title="Pengunjung" 
          value="1,284" 
          icon={Users} 
          trend="up" 
          trendValue="18%" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Pesanan Baru" 
          value="48" 
          icon={ShoppingCart} 
          trend="down" 
          trendValue="3%" 
          color="bg-green-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Produk Terbaru</h3>
            <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              <RefreshCw size={12} className={statsUpdated ? 'animate-spin' : ''} />
              <span>Live</span>
            </span>
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {recentProducts.length > 0 ? recentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-dark-bg rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package size={16} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm truncate">{product.title}</p>
                    <p className="text-xs text-gray-500">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(product.created_at).toLocaleDateString('id-ID')}
                  </span>
                </motion.div>
              )) : (
                <p className="text-gray-500 text-sm">Belum ada aktivitas produk terbaru.</p>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
          <h3 className="text-lg font-bold mb-6">Aktivitas Sistem</h3>
          <div className="space-y-4">
             <div className="flex items-center space-x-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <p className="text-sm text-gray-600 dark:text-gray-400">Database Supabase terhubung</p>
             </div>
             <div className="flex items-center space-x-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <p className="text-sm text-gray-600 dark:text-gray-400">Realtime subscription aktif</p>
             </div>
             <div className="flex items-center space-x-4">
               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
               <p className="text-sm text-gray-600 dark:text-gray-400">Cloudinary siap digunakan</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
