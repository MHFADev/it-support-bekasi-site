import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Shield,
  Bell,
  Wifi
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { toast } from 'react-hot-toast';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { admin, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Berhasil keluar');
    navigate('/admin/login');
  };

  const isActiveRoute = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Produk' },
    { path: '/admin/settings', icon: Settings, label: 'Pengaturan Web' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border transition-all duration-300 flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-dark-border">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <Shield className="text-brand-500" size={24} />
              <span className="font-bold text-xl text-brand-500">Admin</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-4">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                isActiveRoute(item.path)
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'hover:bg-brand-50 dark:hover:bg-brand-900/20 text-gray-600 dark:text-gray-400 hover:text-brand-500'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Admin Profile & Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-border space-y-3">
          {isSidebarOpen && admin && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold">
                {admin.displayName?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">
                  {admin.displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">@{admin.username}</p>
              </div>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Selamat Datang, {admin?.displayName || 'Admin'}
            </h2>
            <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              <Wifi size={12} />
              <span>Realtime</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
